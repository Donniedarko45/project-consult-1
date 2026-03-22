import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import ApiResponse from '../../utils/apiResponse';
import ApiError from '../../utils/apiError';

/**
 * Get current user profile
 * GET /api/user/me
 */
export const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const user = await userService.getUserById(req.user.userId);
        ApiResponse.success(res, user, 'User profile retrieved successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * Update user profile
 * POST /api/user/profile
 */
export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { name, email, pan, aadhar, dob, gender } = req.body;

        if (!name) {
            throw ApiError.badRequest('Name is required');
        }

        if (!email) {
            throw ApiError.badRequest('Email is required');
        }

        const updatedUser = await userService.updateProfile(req.user.userId, {
            name,
            email,
            pan,
            aadhar,
            dob,
            gender,
        });

        ApiResponse.success(res, updatedUser, 'Profile updated successfully');
    } catch (error) {
        next(error);
    }
};

export default {
    getMe,
    updateProfile,
};
