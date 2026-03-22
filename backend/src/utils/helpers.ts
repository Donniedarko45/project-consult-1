import crypto from 'crypto';
import config from '../config';

/**
 * Generate a random numeric OTP
 */
export const generateOTP = (): string => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < config.otp.length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
};

/**
 * Calculate OTP expiry time
 */
export const getOTPExpiry = (): Date => {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + config.otp.expiryMinutes);
    return expiry;
};

/**
 * Check if OTP is expired
 */
export const isOTPExpired = (expiresAt: Date): boolean => {
    return new Date() > expiresAt;
};

/**
 * Verify HMAC-SHA256 signature (generic helper)
 */
export const verifyHmacSignature = (
    body: string,
    signature: string,
    secret: string
): boolean => {
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
};

/**
 * Format phone number to E.164 format for Twilio
 */
export const formatPhoneNumber = (phone: string): string => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');

    // Add India country code if not present
    if (cleaned.length === 10) {
        return `+91${cleaned}`;
    }

    // If already has country code
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+${cleaned}`;
    }

    return `+${cleaned}`;
};

/**
 * Calculate subscription end date based on plan duration
 */
export const calculateSubscriptionEndDate = (
    startDate: Date,
    durationMonths: number
): Date => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + durationMonths);
    return endDate;
};

export default {
    generateOTP,
    getOTPExpiry,
    isOTPExpired,
    verifyHmacSignature,
    formatPhoneNumber,
    calculateSubscriptionEndDate,
};
