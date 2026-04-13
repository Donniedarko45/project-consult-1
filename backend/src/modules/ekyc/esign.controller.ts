import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/client';
import { SignStatus } from '@prisma/client';
import * as digioService from './digio.service';
import ApiResponse from '../../utils/apiResponse';
import ApiError from '../../utils/apiError';
import fs from 'fs';
import path from 'path';
import { sendWhatsAppMessage, sendSMSMessage } from '../auth/twilio.service';

/**
 * Send Telegram link notification after e-sign completion
 * Attempts WhatsApp first, falls back to SMS if WhatsApp fails
 * Non-blocking: logs errors without throwing
 */
const sendTelegramLinkNotification = async (subscriptionId: string): Promise<void> => {
    try {
        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: {
                plan: true,
                user: true,
            },
        });

        if (!subscription || !subscription.user.phone) {
            console.warn(`[ESIGN] No phone number found for subscription ${subscriptionId}`);
            return;
        }

        const userName = subscription.user.name || 'Valued Customer';
        const planName = subscription.plan.name;
        const telegramLink = subscription.plan.telegramLink || '';
        const message = `Dear ${userName},\n\nYour subscription agreement for ${planName} has been successfully signed!\n\nJoin your advisory Telegram channel here: ${telegramLink}\n\nThank you for choosing Ashwini SD Research.`;

        let whatsappSucceeded = false;

        // Attempt WhatsApp first.
        try {
            await sendWhatsAppMessage(subscription.user.phone, message);
            whatsappSucceeded = true;
            console.log(`[ESIGN] WhatsApp Telegram link accepted for subscription ${subscriptionId}`);
        } catch (waErr: any) {
            console.warn(`[ESIGN] WhatsApp failed (${waErr?.message}), trying SMS...`);
        }

        // Always attempt SMS as a reliability channel for Telegram-link delivery.
        try {
            await sendSMSMessage(subscription.user.phone, message);
            console.log(`[ESIGN] SMS Telegram link accepted for subscription ${subscriptionId}`);
        } catch (smsErr: any) {
            if (!whatsappSucceeded) {
                console.error(`[ESIGN] Both WhatsApp and SMS failed for subscription ${subscriptionId}:`, smsErr?.message);
            } else {
                console.warn(`[ESIGN] WhatsApp accepted, but SMS failed for subscription ${subscriptionId}:`, smsErr?.message);
            }
        }
    } catch (err) {
        console.error('[ESIGN] Failed to send Telegram link notification:', err);
        // Don't throw — signStatus update should succeed even if notification fails
    }
};

/**
 * Generate a simple agreement PDF as base64
 * In production, you'd use a proper PDF template library
 */
const getAgreementBase64 = (
    _userName: string,
    _planName: string,
    _planPrice: string,
    _planDuration: string,
): string => {
    // Check if a pre-built PDF template exists
    const templatePath = path.join(__dirname, '../../../agreements/subscription_agreement.pdf');

    if (fs.existsSync(templatePath)) {
        const pdfBuffer = fs.readFileSync(templatePath);
        return pdfBuffer.toString('base64');
    }

    // If no template exists, throw error - agreement PDF must be uploaded
    throw new Error(
        'Agreement PDF template not found. Please upload a PDF template at agreements/subscription_agreement.pdf'
    );
};

/**
 * Initiate e-sign for a subscription agreement
 * POST /api/ekyc/sign/init
 * 
 * Body: { subscriptionId: string }
 * 
 * Flow:
 * 1. Verify user has completed KYC and payment
 * 2. Create a sign request on Digio with the agreement PDF
 * 3. Return the Digio document ID for the frontend SDK to use
 */
export const initSign = async (
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

        // Get the subscription with plan and user details
        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: {
                plan: true,
                user: true,
                payment: true,
            },
        });

        if (!subscription) {
            throw ApiError.notFound('Subscription not found');
        }

        // Verify the subscription belongs to this user
        if (subscription.userId !== req.user.userId) {
            throw ApiError.forbidden('You do not have access to this subscription');
        }

        // Check if payment is complete
        // If subscription is ACTIVE, payment was already done (subscription gets activated after payment)
        const paymentDone =
            subscription.status === 'ACTIVE' ||
            (subscription.payment && subscription.payment.status === 'SUCCESS');
        if (!paymentDone) {
            throw ApiError.badRequest('Payment must be completed before signing the agreement');
        }

        // Check if KYC is verified
        if (subscription.user.kycStatus !== 'VERIFIED') {
            throw ApiError.badRequest('KYC verification must be completed before signing');
        }

        // Check if already signed
        if (subscription.signStatus === SignStatus.SIGNED) {
            ApiResponse.success(res, {
                signStatus: subscription.signStatus,
                digioDocId: subscription.digioDocId,
                message: 'Agreement already signed',
            }, 'Agreement already signed');
            return;
        }

        // Check if sign request already exists (user can resume signing)
        if (subscription.digioDocId && subscription.signStatus === SignStatus.REQUESTED) {
            ApiResponse.success(res, {
                signStatus: subscription.signStatus,
                digioDocId: subscription.digioDocId,
                message: 'Sign request already exists. Use the document ID to resume signing.',
            }, 'Sign request already exists');
            return;
        }

        // Get user email/phone for signer identifier
        const signerIdentifier = subscription.user.email || subscription.user.phone;
        const signerName = subscription.user.name || 'Subscriber';

        if (!signerIdentifier) {
            throw ApiError.badRequest('User must have an email or phone number for signing');
        }

        // Get the agreement PDF as base64
        const agreementBase64 = getAgreementBase64(
            signerName,
            subscription.plan.name,
            subscription.plan.price.toString(),
            `${subscription.plan.durationMonths} month(s)`,
        );

        // Create sign request on Digio
        const fileName = `${subscription.plan.name.replace(/\s+/g, '_')}_Agreement_${subscription.id}.pdf`;

        const signResponse = await digioService.createSignRequest(
            signerName,
            signerIdentifier,
            agreementBase64,
            fileName,
            30, // expire in 30 days
        );

        // Update subscription with the Digio document ID
        await prisma.subscription.update({
            where: { id: subscriptionId },
            data: {
                digioDocId: signResponse.id,
                signStatus: SignStatus.REQUESTED,
            },
        });

        ApiResponse.success(res, {
            digioDocId: signResponse.id,
            signStatus: SignStatus.REQUESTED,
            signingParties: signResponse.signing_parties,
            fileName: signResponse.file_name,
        }, 'Sign request created successfully. Use the document ID with Digio SDK to sign.');

    } catch (error) {
        next(error);
    }
};

/**
 * Get e-sign status for a subscription
 * GET /api/ekyc/sign/status/:subscriptionId
 */
export const getSignStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { subscriptionId } = req.params;

        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            select: {
                id: true,
                userId: true,
                digioDocId: true,
                signStatus: true,
                signedAt: true,
                agreementUrl: true,
            },
        });

        if (!subscription) {
            throw ApiError.notFound('Subscription not found');
        }

        if (subscription.userId !== req.user.userId) {
            throw ApiError.forbidden('You do not have access to this subscription');
        }

        // If there's a Digio doc ID and status is REQUESTED, check latest status from Digio
        let latestStatus = subscription.signStatus;
        if (subscription.digioDocId && subscription.signStatus === SignStatus.REQUESTED) {
            try {
                const docStatus = await digioService.getDocumentStatus(subscription.digioDocId);

                if (docStatus.agreement_status === 'completed') {
                    // Agreement was signed — update our DB
                    await prisma.subscription.update({
                        where: { id: subscriptionId },
                        data: {
                            signStatus: SignStatus.SIGNED,
                            signedAt: new Date(),
                        },
                    });
                    latestStatus = SignStatus.SIGNED;

                    // Send Telegram link notification after successful sign
                    await sendTelegramLinkNotification(subscriptionId);
                } else if (docStatus.agreement_status === 'rejected' || docStatus.agreement_status === 'expired') {
                    await prisma.subscription.update({
                        where: { id: subscriptionId },
                        data: {
                            signStatus: SignStatus.FAILED,
                        },
                    });
                    latestStatus = SignStatus.FAILED;
                }
            } catch (err) {
                console.error('[ESIGN] Error checking Digio status:', err);
                // Don't throw — return the cached status
            }
        }

        ApiResponse.success(res, {
            subscriptionId: subscription.id,
            digioDocId: subscription.digioDocId,
            signStatus: latestStatus,
            signedAt: subscription.signedAt,
            agreementUrl: subscription.agreementUrl,
        }, 'Sign status retrieved');

    } catch (error) {
        next(error);
    }
};

/**
 * Handle Digio webhook callback for e-sign completion
 * POST /api/ekyc/sign/webhook
 * 
 * Digio sends a POST with document status updates
 */
export const handleSignWebhook = async (
    req: Request,
    res: Response,
    _next: NextFunction
): Promise<void> => {
    try {
        console.log('[ESIGN WEBHOOK] Received:', JSON.stringify(req.body));

        const { digio_doc_id, status, event_type } = req.body;

        if (!digio_doc_id) {
            res.status(200).json({ success: true, message: 'Acknowledged (no doc id)' });
            return;
        }

        // Find the subscription by Digio document ID
        const subscription = await prisma.subscription.findFirst({
            where: { digioDocId: digio_doc_id },
        });

        if (!subscription) {
            console.log('[ESIGN WEBHOOK] No subscription found for doc:', digio_doc_id);
            res.status(200).json({ success: true, message: 'No matching subscription' });
            return;
        }

        // Map Digio status to our SignStatus
        let signStatus: SignStatus;
        const signedAt = new Date();

        if (status === 'completed' || status === 'signed' || event_type === 'sign_completed') {
            signStatus = SignStatus.SIGNED;
        } else if (status === 'rejected' || status === 'expired' || status === 'failed') {
            signStatus = SignStatus.FAILED;
        } else {
            signStatus = SignStatus.REQUESTED;
        }

        // Update subscription
        await prisma.subscription.update({
            where: { id: subscription.id },
            data: {
                signStatus,
                ...(signStatus === SignStatus.SIGNED && { signedAt }),
            },
        });

        console.log(`[ESIGN WEBHOOK] Updated subscription ${subscription.id} sign status to ${signStatus}`);

        // Send Telegram link notification if signing completed
        if (signStatus === SignStatus.SIGNED) {
            await sendTelegramLinkNotification(subscription.id);
        }

        res.status(200).json({ success: true, message: `Sign status updated to ${signStatus}` });

    } catch (error) {
        console.error('[ESIGN WEBHOOK] Error:', error);
        // Always return 200 to Digio webhooks to prevent retries
        res.status(200).json({ success: true, message: 'Webhook processed with errors' });
    }
};

/**
 * Update sign status after frontend SDK callback
 * POST /api/ekyc/sign/update-status
 * 
 * Called by the frontend after the user completes signing via Digio SDK
 * Body: { subscriptionId: string, digioDocId: string, status: string }
 */
export const updateSignStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { subscriptionId, status } = req.body;

        if (!subscriptionId || !status) {
            throw ApiError.badRequest('subscriptionId and status are required');
        }

        const subscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
        });

        if (!subscription) {
            throw ApiError.notFound('Subscription not found');
        }

        if (subscription.userId !== req.user.userId) {
            throw ApiError.forbidden('You do not have access to this subscription');
        }

        // Verify with Digio if the document is actually signed
        let signStatus: SignStatus = SignStatus.REQUESTED;
        let signedAt: Date | undefined;

        if (subscription.digioDocId) {
            try {
                const docStatus = await digioService.getDocumentStatus(subscription.digioDocId);

                if (docStatus.agreement_status === 'completed') {
                    signStatus = SignStatus.SIGNED;
                    signedAt = new Date();
                } else if (docStatus.agreement_status === 'rejected' || docStatus.agreement_status === 'expired') {
                    signStatus = SignStatus.FAILED;
                }
            } catch (err) {
                console.error('[ESIGN] Error verifying with Digio:', err);
                // Fall back to the status from frontend
                if (status === 'success' || status === 'signed') {
                    signStatus = SignStatus.SIGNED;
                    signedAt = new Date();
                } else if (status === 'failed' || status === 'rejected') {
                    signStatus = SignStatus.FAILED;
                }
            }
        }

        await prisma.subscription.update({
            where: { id: subscriptionId },
            data: {
                signStatus,
                ...(signedAt && { signedAt }),
            },
        });

        // Send Telegram link notification if signing completed
        if (signStatus === SignStatus.SIGNED) {
            await sendTelegramLinkNotification(subscriptionId);
        }

        ApiResponse.success(res, {
            signStatus,
            signedAt,
        }, `Sign status updated to ${signStatus}`);

    } catch (error) {
        next(error);
    }
};

/**
 * Initiate e-sign for user-level advisory agreement (before plan selection)
 * POST /api/ekyc/sign/init-agreement
 */
export const initUserAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) throw ApiError.unauthorized();

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });

        if (!user) throw ApiError.notFound('User not found');

        if (user.kycStatus !== 'VERIFIED') {
            throw ApiError.badRequest('KYC verification must be completed before signing the agreement');
        }

        if (user.agreementSignStatus === SignStatus.SIGNED) {
            ApiResponse.success(res, {
                signStatus: user.agreementSignStatus,
                digioDocId: user.agreementDigioDocId,
                message: 'Agreement already signed',
            }, 'Agreement already signed');
            return;
        }

        if (user.agreementDigioDocId && user.agreementSignStatus === SignStatus.REQUESTED) {
            ApiResponse.success(res, {
                signStatus: user.agreementSignStatus,
                digioDocId: user.agreementDigioDocId,
                message: 'Sign request already exists. Use the document ID to resume signing.',
            }, 'Sign request already exists');
            return;
        }

        const signerIdentifier = user.email || user.phone;
        const signerName = user.name || 'Subscriber';

        if (!signerIdentifier) {
            throw ApiError.badRequest('User must have an email or phone number for signing');
        }

        const agreementBase64 = getAgreementBase64(signerName, 'Advisory Services', '', '');
        const fileName = `Advisory_Agreement_${user.id}.pdf`;

        const signResponse = await digioService.createSignRequest(
            signerName,
            signerIdentifier,
            agreementBase64,
            fileName,
            30,
        );

        await prisma.user.update({
            where: { id: req.user.userId },
            data: {
                agreementDigioDocId: signResponse.id,
                agreementSignStatus: SignStatus.REQUESTED,
            },
        });

        ApiResponse.success(res, {
            digioDocId: signResponse.id,
            signStatus: SignStatus.REQUESTED,
            signingParties: signResponse.signing_parties,
        }, 'Agreement sign request created. Use the document ID with Digio SDK to sign.');

    } catch (error) {
        next(error);
    }
};

/**
 * Update user agreement sign status after Digio SDK callback
 * POST /api/ekyc/sign/update-agreement
 */
export const updateUserAgreement = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) throw ApiError.unauthorized();

        const { status } = req.body;
        if (!status) throw ApiError.badRequest('status is required');

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });

        if (!user) throw ApiError.notFound('User not found');

        let signStatus: SignStatus = SignStatus.REQUESTED;
        let signedAt: Date | undefined;

        if (user.agreementDigioDocId) {
            try {
                const docStatus = await digioService.getDocumentStatus(user.agreementDigioDocId);
                if (docStatus.agreement_status === 'completed') {
                    signStatus = SignStatus.SIGNED;
                    signedAt = new Date();
                } else if (docStatus.agreement_status === 'rejected' || docStatus.agreement_status === 'expired') {
                    signStatus = SignStatus.FAILED;
                }
            } catch (err) {
                if (status === 'success' || status === 'signed') {
                    signStatus = SignStatus.SIGNED;
                    signedAt = new Date();
                } else if (status === 'failed' || status === 'rejected') {
                    signStatus = SignStatus.FAILED;
                }
            }
        }

        await prisma.user.update({
            where: { id: req.user.userId },
            data: {
                agreementSignStatus: signStatus,
                ...(signedAt && { agreementSignedAt: signedAt }),
            },
        });

        ApiResponse.success(res, {
            signStatus,
            signedAt,
        }, `Agreement sign status updated to ${signStatus}`);

    } catch (error) {
        next(error);
    }
};

export default {
    initSign,
    getSignStatus,
    handleSignWebhook,
    updateSignStatus,
    initUserAgreement,
    updateUserAgreement,
};
