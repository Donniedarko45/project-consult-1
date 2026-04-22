import prisma from '../../prisma/client';
import { SubscriptionStatus } from '@prisma/client';
import ApiError from '../../utils/apiError';
import { calculateSubscriptionEndDate } from '../../utils/helpers';
import { sendWhatsAppMessage, sendSMSMessage } from '../auth/twilio.service';

interface SubscriptionWithPlan {
    id: string;
    status: SubscriptionStatus;
    startDate: Date | null;
    endDate: Date | null;
    createdAt: Date;
    digioDocId: string | null;
    signStatus: string;
    signedAt: Date | null;
    agreementUrl: string | null;
    plan: {
        id: string;
        name: string;
        durationMonths: number;
        price: unknown;
    };
}

interface InitSubscriptionResult {
    subscription: SubscriptionWithPlan;
    message: string;
}

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message?: unknown }).message;
        if (typeof message === 'string') {
            return message;
        }
    }
    return 'Unknown error';
};

/**
 * Initialize a new subscription for a user
 */
export const initSubscription = async (
    userId: string,
    planId: string
): Promise<InitSubscriptionResult> => {
    // Check if plan exists and is active
    const plan = await prisma.subscriptionPlan.findUnique({
        where: { id: planId },
    });

    if (!plan || !plan.isActive) {
        throw ApiError.badRequest('Invalid or inactive plan selected');
    }

    // Check if user already has an active or pending subscription
    const existingSubscription = await prisma.subscription.findFirst({
        where: {
            userId,
            status: {
                in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING],
            },
        },
        include: {
            plan: {
                select: {
                    id: true,
                    name: true,
                    durationMonths: true,
                    price: true,
                },
            },
        },
    });

    if (existingSubscription) {
        if (existingSubscription.status === SubscriptionStatus.ACTIVE) {
            throw ApiError.conflict('You already have an active subscription');
        }
        if (existingSubscription.status === SubscriptionStatus.PENDING) {
            // If the pending subscription is for the SAME plan, reuse it
            if (existingSubscription.plan.id === planId) {
                return {
                    subscription: existingSubscription,
                    message: 'You have a pending subscription. Please proceed to payment.',
                };
            }
            // Different plan selected — delete the stale pending subscription and create a new one
            await prisma.subscription.delete({
                where: { id: existingSubscription.id },
            });
        }
    }

    // Create new subscription
    const subscription = await prisma.subscription.create({
        data: {
            userId,
            planId,
            status: SubscriptionStatus.PENDING,
        },
        include: {
            plan: {
                select: {
                    id: true,
                    name: true,
                    durationMonths: true,
                    price: true,
                },
            },
        },
    });

    return {
        subscription,
        message: 'Subscription initialized. Please proceed to payment.',
    };
};

/**
 * Get current subscription for a user
 */
export const getCurrentSubscription = async (
    userId: string
): Promise<SubscriptionWithPlan | null> => {
    const subscription = await prisma.subscription.findFirst({
        where: {
            userId,
            status: {
                in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.PENDING],
            },
        },
        include: {
            plan: {
                select: {
                    id: true,
                    name: true,
                    durationMonths: true,
                    price: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return subscription;
};

/**
 * Activate subscription after successful payment
 */
export const activateSubscription = async (
    subscriptionId: string
): Promise<void> => {
    const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
        include: { plan: true },
    });

    if (!subscription) {
        throw ApiError.notFound('Subscription not found');
    }

    const startDate = new Date();
    const endDate = calculateSubscriptionEndDate(
        startDate,
        subscription.plan.durationMonths
    );

    // Update subscription and user access in a transaction
    await prisma.$transaction([
        prisma.subscription.update({
            where: { id: subscriptionId },
            data: {
                status: SubscriptionStatus.ACTIVE,
                startDate,
                endDate,
            },
        }),
        prisma.user.update({
            where: { id: subscription.userId },
            data: { hasAccess: true },
        }),
    ]);

    // Send subscription confirmation with Telegram link
    try {
        const fullSubscription = await prisma.subscription.findUnique({
            where: { id: subscriptionId },
            include: {
                plan: true,
                user: true,
            },
        });

        if (fullSubscription && fullSubscription.user.phone) {
            const userName = fullSubscription.user.name || 'Valued Customer';
            const planName = fullSubscription.plan.name;
            const telegramLink = fullSubscription.plan.telegramLink || '';
            const message = `Dear ${userName},\nYour subscription to ${planName} is now ACTIVE!\nJoin your advisory Telegram channel here: ${telegramLink}\n\nThank you for choosing Ashwini SD Research.`;

            let whatsappSucceeded = false;

            // Attempt WhatsApp first.
            try {
                await sendWhatsAppMessage(fullSubscription.user.phone, message);
                whatsappSucceeded = true;
                console.log(`[SUBSCRIPTION] WhatsApp confirmation accepted for subscription ${subscriptionId}`);
            } catch (waErr: unknown) {
                console.warn(`[SUBSCRIPTION] WhatsApp failed (${getErrorMessage(waErr)}), trying SMS...`);
            }

            // Also send SMS to improve delivery reliability.
            try {
                await sendSMSMessage(fullSubscription.user.phone, message);
                console.log(`[SUBSCRIPTION] SMS confirmation accepted for subscription ${subscriptionId}`);
            } catch (smsErr: unknown) {
                if (!whatsappSucceeded) {
                    console.error(
                        `[SUBSCRIPTION] Both WhatsApp and SMS failed for subscription ${subscriptionId}:`,
                        getErrorMessage(smsErr),
                    );
                } else {
                    console.warn(
                        `[SUBSCRIPTION] WhatsApp accepted, but SMS failed for subscription ${subscriptionId}:`,
                        getErrorMessage(smsErr),
                    );
                }
            }
        } else {
            console.warn(`[SUBSCRIPTION] No phone number found for subscription ${subscriptionId}`);
        }
    } catch (err) {
        console.error('[SUBSCRIPTION] Failed to send WhatsApp confirmation:', err);
        // Don't throw — subscription is already activated
    }
};

/**
 * Get subscription by ID
 */
export const getSubscriptionById = async (
    subscriptionId: string
): Promise<SubscriptionWithPlan | null> => {
    const subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
        include: {
            plan: {
                select: {
                    id: true,
                    name: true,
                    durationMonths: true,
                    price: true,
                },
            },
        },
    });

    return subscription;
};

export default {
    initSubscription,
    getCurrentSubscription,
    activateSubscription,
    getSubscriptionById,
};
