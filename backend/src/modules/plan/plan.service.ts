import prisma from '../../prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

interface SubscriptionPlan {
    id: string;
    name: string;
    durationMonths: number;
    price: Decimal;
    description: string | null;
    isActive: boolean;
}

/**
 * Get all active subscription plans
 */
export const getAllPlans = async (): Promise<SubscriptionPlan[]> => {
    const plans = await prisma.subscriptionPlan.findMany({
        where: {
            isActive: true,
            NOT: [
                { name: { contains: 'Test', mode: 'insensitive' } },
                { name: { contains: 'Trial', mode: 'insensitive' } },
                { description: { contains: '(Demo)', mode: 'insensitive' } },
            ],
        },
        orderBy: { durationMonths: 'asc' },
    });

    return plans;
};

/**
 * Get a specific plan by ID
 */
export const getPlanById = async (
    planId: string
): Promise<SubscriptionPlan | null> => {
    const plan = await prisma.subscriptionPlan.findUnique({
        where: { id: planId },
    });

    return plan;
};

export default {
    getAllPlans,
    getPlanById,
};
