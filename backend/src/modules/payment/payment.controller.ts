import { Request, Response, NextFunction } from 'express';
import * as paymentService from './payment.service';
import * as cashfreeService from './cashfree.service';
import * as subscriptionService from '../subscription/subscription.service';
import prisma from '../../prisma/client';
import { PaymentStatus } from '@prisma/client';
import ApiResponse from '../../utils/apiResponse';
import ApiError from '../../utils/apiError';

/**
 * Create a payment order
 * POST /api/payments/create-order
 */
export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { subscriptionId } = req.body;

        if (!subscriptionId) {
            throw ApiError.badRequest('Subscription ID is required');
        }

        const order = await paymentService.createPaymentOrder(
            req.user.userId,
            subscriptionId
        );

        ApiResponse.success(res, order, 'Payment order created successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * Verify payment status by checking with Cashfree
 * POST /api/payments/verify
 * 
 * This is a fallback for when webhooks don't fire.
 * It checks the order status directly with Cashfree and
 * activates the subscription if payment was successful.
 */
export const verifyPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { subscriptionId } = req.body;

        if (!subscriptionId) {
            throw ApiError.badRequest('Subscription ID is required');
        }

        // Find the subscription
        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: { payment: true },
        });

        if (!subscription) {
            throw ApiError.notFound('Subscription not found');
        }

        if (subscription.userId !== req.user.userId) {
            throw ApiError.forbidden('You do not have access to this subscription');
        }

        // If already active, no need to verify
        if (subscription.status === 'ACTIVE') {
            ApiResponse.success(res, {
                status: 'ACTIVE',
                message: 'Subscription is already active',
            }, 'Subscription already active');
            return;
        }

        // Must have a payment record with a Cashfree order ID
        if (!subscription.payment || !subscription.payment.cashfreeOrderId) {
            throw ApiError.badRequest('No payment order found for this subscription. Please initiate payment first.');
        }

        // Check with Cashfree directly
        console.log(`[VERIFY] Checking order ${subscription.payment.cashfreeOrderId} with Cashfree`);
        const cashfreeOrder = await cashfreeService.fetchOrder(subscription.payment.cashfreeOrderId);
        console.log(`[VERIFY] Cashfree order status:`, cashfreeOrder.order_status);

        if (cashfreeOrder.order_status === 'PAID') {
            // Payment was successful! Update our records
            await prisma.payment.update({
                where: { id: subscription.payment.id },
                data: {
                    status: PaymentStatus.SUCCESS,
                    cashfreePaymentId: cashfreeOrder.cf_order_id ? String(cashfreeOrder.cf_order_id) : null,
                },
            });

            // Activate the subscription
            await subscriptionService.activateSubscription(subscription.id);

            console.log(`[VERIFY] Subscription ${subscription.id} activated after manual verification`);

            ApiResponse.success(res, {
                status: 'PAID',
                subscriptionStatus: 'ACTIVE',
                message: 'Payment verified and subscription activated!',
            }, 'Payment verified successfully');
        } else if (cashfreeOrder.order_status === 'ACTIVE') {
            // Order created but payment not yet completed
            ApiResponse.success(res, {
                status: 'PENDING',
                cashfreeStatus: cashfreeOrder.order_status,
                message: 'Payment is still pending. Please complete the payment.',
            }, 'Payment pending');
        } else {
            // Payment failed or expired
            ApiResponse.success(res, {
                status: 'FAILED',
                cashfreeStatus: cashfreeOrder.order_status,
                message: `Payment status: ${cashfreeOrder.order_status}`,
            }, 'Payment not successful');
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Handle Cashfree webhook
 * POST /api/webhooks/cashfree
 */
export const handleWebhook = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const signature = req.headers['x-webhook-signature'] as string;
        const timestamp = req.headers['x-webhook-timestamp'] as string;

        if (!signature || !timestamp) {
            throw ApiError.badRequest('Missing webhook signature or timestamp');
        }

        // Get raw body for signature verification
        const rawBody = JSON.stringify(req.body);

        // Verify signature
        const isValid = cashfreeService.verifyWebhookSignature(signature, rawBody, timestamp);

        if (!isValid) {
            console.error('[WEBHOOK] Invalid signature');
            throw ApiError.unauthorized('Invalid webhook signature');
        }

        // Process the webhook
        await paymentService.handleWebhook(req.body);

        // Always respond with 200 to acknowledge receipt
        res.status(200).json({ received: true });
    } catch (error) {
        console.error('[WEBHOOK] Error processing webhook:', error);
        // Still respond with 200 to prevent retries for validation errors
        if (error instanceof ApiError && error.statusCode === 401) {
            res.status(401).json({ error: 'Invalid signature' });
        } else {
            next(error);
        }
    }
};

export default {
    createOrder,
    verifyPayment,
    handleWebhook,
};
