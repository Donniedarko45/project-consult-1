import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import ApiResponse from '../../utils/apiResponse';
import ApiError from '../../utils/apiError';

/**
 * Send OTP to user's phone number via SMS
 * POST /api/auth/send-otp
 */
export const sendOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone } = req.body;

        if (!phone) {
            throw ApiError.badRequest('Phone number is required');
        }

        // Validate phone number format (10 digits for India)
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            throw ApiError.badRequest('Invalid phone number format');
        }

        const result = await authService.sendOTP(phone);
        ApiResponse.success(res, result, 'OTP sent successfully');
    } catch (error) {
        next(error);
    }
};

/**
 * Verify OTP and get JWT token
 * POST /api/auth/verify-otp
 */
export const verifyOTP = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            throw ApiError.badRequest('Phone number and OTP are required');
        }

        // Validate OTP format
        if (!/^\d{6}$/.test(otp)) {
            throw ApiError.badRequest('OTP must be 6 digits');
        }

        const result = await authService.verifyOTP(phone, otp);
        ApiResponse.success(res, result, 'OTP verified successfully');
    } catch (error) {
        next(error);
    }
};

export default {
    sendOTP,
    verifyOTP,
};
