import { Request, Response, NextFunction } from 'express';
import * as planService from './plan.service';
import ApiResponse from '../../utils/apiResponse';

/**
 * Get all subscription plans
 * GET /api/plans
 */
export const getPlans = async (
    _req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const plans = await planService.getAllPlans();
        ApiResponse.success(res, plans, 'Plans retrieved successfully');
    } catch (error) {
        next(error);
    }
};

export default {
    getPlans,
};
