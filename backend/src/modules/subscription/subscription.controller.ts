import { Request, Response, NextFunction } from 'express';
import * as subscriptionService from './subscription.service';
import ApiResponse from '../../utils/apiResponse';
import ApiError from '../../utils/apiError';

/**
 * Initialize a new subscription
 * POST /api/subscriptions/init
 */
export const initSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { planId } = req.body;

        if (!planId) {
            throw ApiError.badRequest('Plan ID is required');
        }

        const result = await subscriptionService.initSubscription(
            req.user.userId,
            planId
        );

        ApiResponse.created(res, result, 'Subscription initialized successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * Get current subscription
 * GET /api/subscriptions/current
 */
export const getCurrentSubscription = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const subscription = await subscriptionService.getCurrentSubscription(
            req.user.userId
        );

        if (!subscription) {
            ApiResponse.success(res, null, 'No active subscription found');
            return;
        }

        ApiResponse.success(res, subscription, 'Subscription retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export default {
    initSubscription,
    getCurrentSubscription,
};
