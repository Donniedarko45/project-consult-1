import prisma from '../../prisma/client';
import { generateToken } from '../../utils/jwt';
import { generateOTP, getOTPExpiry, isOTPExpired, formatPhoneNumber } from '../../utils/helpers';
import { sendSMSOTP } from './brevo.service';
import ApiError from '../../utils/apiError';

interface SendOTPResult {
    message: string;
    userId: string;
}

interface VerifyOTPResult {
    token: string;
    user: {
        id: string;
        phone: string;
        name: string | null;
        email: string | null;
        hasAccess: boolean;
        kycStatus: string;
        agreementSignStatus: string;
    };
    isNewUser: boolean;
}

/**
 * Send OTP to user's phone number via SMS
 */
export const sendOTP = async (phone: string): Promise<SendOTPResult> => {
    const formattedPhone = formatPhoneNumber(phone);

    // Find or create user
    let user = await prisma.user.findUnique({
        where: { phone: formattedPhone },
    });

    if (!user) {
        user = await prisma.user.create({
            data: { phone: formattedPhone },
        });
    }

    // Invalidate any previous unused OTPs
    await prisma.oTP.updateMany({
        where: {
            userId: user.id,
            isUsed: false,
        },
        data: {
            isUsed: true,
        },
    });

    // Generate new OTP
    const otpCode = generateOTP();
    const expiresAt = getOTPExpiry();

    // Save OTP to database
    await prisma.oTP.create({
        data: {
            userId: user.id,
            code: otpCode,
            expiresAt,
        },
    });

    // Send OTP via SMS
    await sendSMSOTP(formattedPhone, otpCode);

    return {
        message: 'OTP sent successfully via SMS',
        userId: user.id,
    };
};

/**
 * Verify OTP and issue JWT token
 */
export const verifyOTP = async (
    phone: string,
    code: string
): Promise<VerifyOTPResult> => {
    const formattedPhone = formatPhoneNumber(phone);

    // Find user
    const user = await prisma.user.findUnique({
        where: { phone: formattedPhone },
    });

    if (!user) {
        throw ApiError.badRequest('User not found. Please request a new OTP.');
    }

    // Find the latest unused OTP for this user
    const otp = await prisma.oTP.findFirst({
        where: {
            userId: user.id,
            code,
            isUsed: false,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    if (!otp) {
        throw ApiError.badRequest('Invalid OTP');
    }

    // Check if OTP is expired
    if (isOTPExpired(otp.expiresAt)) {
        throw ApiError.badRequest('OTP has expired. Please request a new one.');
    }

    // Mark OTP as used
    await prisma.oTP.update({
        where: { id: otp.id },
        data: { isUsed: true },
    });

    // Check if this is a new user (no name set)
    const isNewUser = !user.name;

    // Generate JWT token
    const token = generateToken({
        userId: user.id,
        phone: user.phone,
    });

    return {
        token,
        user: {
            id: user.id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            hasAccess: user.hasAccess,
            kycStatus: user.kycStatus,
            agreementSignStatus: user.agreementSignStatus,
        },
        isNewUser,
    };
};

export default {
    sendOTP,
    verifyOTP,
};
