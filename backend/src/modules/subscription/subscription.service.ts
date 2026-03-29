import prisma from '../../prisma/client';
import { SubscriptionStatus } from '@prisma/client';
import ApiError from '../../utils/apiError';
import { calculateSubscriptionEndDate } from '../../utils/helpers';
import { sendWhatsAppMessage } from '../auth/twilio.service';

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

    // Send WhatsApp confirmation with Telegram link
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
            const telegramLink = (fullSubscription.plan as any).telegramLink || '';
            const message = `Dear ${userName},\nYour purchase order for advisory subscription channel ${planName} has been confirmed.\nKindly click on the link given to join and availing your services ${telegramLink}`;

            await sendWhatsAppMessage(fullSubscription.user.phone, message);
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
