import crypto from 'crypto';
import prisma from '../../prisma/client';
import { PaymentStatus } from '@prisma/client';
import * as cashfreeService from './cashfree.service';
import * as subscriptionService from '../subscription/subscription.service';
import ApiError from '../../utils/apiError';

interface CreateOrderResult {
    orderId: string;
    cfOrderId: string;
    amount: number;
    currency: string;
    subscriptionId: string;
    paymentSessionId: string;
}

interface CashfreeWebhookPayload {
    data: {
        order: {
            order_id: string;
            order_amount: number;
            order_currency: string;
        };
        payment: {
            cf_payment_id: number;
            payment_status: string;
            payment_amount: number;
            payment_currency: string;
            payment_message: string;
            payment_time: string;
        };
    };
    event_time: string;
    type: string;
}

/**
 * Create a payment order for a subscription
 */
export const createPaymentOrder = async (
    userId: string,
    subscriptionId: string
): Promise<CreateOrderResult> => {
    // Get the subscription
    const subscription = await subscriptionService.getSubscriptionById(subscriptionId);

    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    // Verify the subscription belongs to this user
    const fullSubscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
        include: { plan: true, user: true },
    });

    if (!fullSubscription || fullSubscription.userId !== userId) {
        throw ApiError.forbidden('You do not have access to this subscription');
    }

    if (fullSubscription.status !== 'PENDING') {
        throw ApiError.badRequest('This subscription is not pending payment');
    }

    // Check if there's already a payment for this subscription
    const existingPayment = await prisma.payment.findUnique({
        where: { subscriptionId },
    });

    if (existingPayment && existingPayment.status === PaymentStatus.SUCCESS) {
        throw ApiError.conflict('Payment already completed for this subscription');
    }

    // Cashfree uses amount in INR (not paise)
    const amount = Number(fullSubscription.plan.price);

    // Generate unique order ID for Cashfree
    const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    // Create Cashfree order
    const cashfreeOrder = await cashfreeService.createOrder({
        orderId,
        orderAmount: amount,
        currency: 'INR',
        customerId: userId.replace(/-/g, '').substring(0, 50),
        customerPhone: fullSubscription.user.phone.replace(/^\+/, ''),
        customerEmail: fullSubscription.user.email || undefined,
    });

    // Create or update payment record
    if (existingPayment) {
        await prisma.payment.update({
            where: { id: existingPayment.id },
            data: {
                cashfreeOrderId: orderId,
                amount: fullSubscription.plan.price,
                status: PaymentStatus.PENDING,
            },
        });
    } else {
        await prisma.payment.create({
            data: {
                subscriptionId,
                cashfreeOrderId: orderId,
                amount: fullSubscription.plan.price,
                currency: 'INR',
                status: PaymentStatus.PENDING,
            },
        });
    }

    return {
        orderId,
        cfOrderId: cashfreeOrder.cf_order_id,
        amount,
        currency: 'INR',
        subscriptionId,
        paymentSessionId: cashfreeOrder.payment_session_id,
    };
};

/**
 * Handle Cashfree webhook
 */
export const handleWebhook = async (payload: CashfreeWebhookPayload): Promise<void> => {
    const { type, data } = payload;

    console.log(`[WEBHOOK] Received event: ${type}`);

    if (type === 'PAYMENT_SUCCESS_WEBHOOK') {
        const { order, payment } = data;
        const orderId = order.order_id;
        const cfPaymentId = String(payment.cf_payment_id);

        console.log(`[WEBHOOK] Processing payment ${cfPaymentId} for order ${orderId}`);

        // Find the payment by Cashfree order ID
        const paymentRecord = await prisma.payment.findUnique({
            where: { cashfreeOrderId: orderId },
            include: { subscription: true },
        });

        if (!paymentRecord) {
            console.error(`[WEBHOOK] Payment not found for order ${orderId}`);
            return;
        }

        if (paymentRecord.status === PaymentStatus.SUCCESS) {
            console.log(`[WEBHOOK] Payment already processed for order ${orderId}`);
            return;
        }

        // Update payment status
        await prisma.payment.update({
            where: { id: paymentRecord.id },
            data: {
                cashfreePaymentId: cfPaymentId,
                status: PaymentStatus.SUCCESS,
            },
        });

        // Activate the subscription
        await subscriptionService.activateSubscription(paymentRecord.subscriptionId);

        console.log(`[WEBHOOK] Successfully activated subscription ${paymentRecord.subscriptionId}`);
    } else if (type === 'PAYMENT_FAILED_WEBHOOK') {
        const orderId = data.order.order_id;

        // Update payment status to failed
        await prisma.payment.updateMany({
            where: { cashfreeOrderId: orderId },
            data: { status: PaymentStatus.FAILED },
        });

        console.log(`[WEBHOOK] Payment failed for order ${orderId}`);
    } else if (type === 'PAYMENT_USER_DROPPED_WEBHOOK') {
        const orderId = data.order.order_id;

        console.log(`[WEBHOOK] User dropped payment for order ${orderId}`);
    }
};

export default {
    createPaymentOrder,
    handleWebhook,
};
