import { Router } from 'express';
import * as authController from './auth.controller';
import { otpRateLimiter } from '../../middlewares/rateLimit.middleware';

const router = Router();

/**
 * @route   POST /api/auth/send-otp
 * @desc    Send OTP to user's phone number via SMS
 * @access  Public
 */
router.post('/send-otp', otpRateLimiter, authController.sendOTP);

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify OTP and get JWT token
 * @access  Public
 */
router.post('/verify-otp', otpRateLimiter, authController.verifyOTP);

export default router;
