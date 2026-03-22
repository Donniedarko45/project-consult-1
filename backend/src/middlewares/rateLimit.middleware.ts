import rateLimit from 'express-rate-limit';

// Rate limiter for OTP endpoints - 5 requests per minute per IP
export const otpRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many OTP requests, please try again after a minute',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// General API rate limiter - 100 requests per minute per IP
export const apiRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100,
    message: {
        success: false,
        message: 'Too many requests, please try again later',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default {
    otpRateLimiter,
    apiRateLimiter,
};
