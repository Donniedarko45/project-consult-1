import prisma from '../../prisma/client';
import ApiError from '../../utils/apiError';

interface UpdateProfileData {
    name: string;
    email: string;
    pan?: string;
    aadhar?: string;
    dob?: string;
    gender?: string;
}

interface UserProfile {
    id: string;
    phone: string;
    name: string | null;
    email: string | null;
    pan: string | null;
    aadhar: string | null;
    dob: string | null;
    gender: string | null;
    kycStatus: string;
    digioKycId: string | null;
    hasAccess: boolean;
    createdAt: Date;
    agreementSignStatus: string;
    agreementDigioDocId: string | null;
    agreementSignedAt: Date | null;
}

const USER_SELECT = {
    id: true,
    phone: true,
    name: true,
    email: true,
    pan: true,
    aadhar: true,
    dob: true,
    gender: true,
    kycStatus: true,
    digioKycId: true,
    hasAccess: true,
    createdAt: true,
    agreementSignStatus: true,
    agreementDigioDocId: true,
    agreementSignedAt: true,
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<UserProfile> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: USER_SELECT,
    });

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    return user;
};

/**
 * Update user profile
 */
export const updateProfile = async (
    userId: string,
    data: UpdateProfileData
): Promise<UserProfile> => {
    const { name, email, pan, aadhar, dob, gender } = data;

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw ApiError.badRequest('Invalid email format');
    }

    // Validate PAN format if provided
    if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
        throw ApiError.badRequest('Invalid PAN format. Expected format: ABCDE1234F');
    }

    // Validate Aadhar format if provided
    if (aadhar && !/^\d{12}$/.test(aadhar)) {
        throw ApiError.badRequest('Invalid Aadhar number. Must be 12 digits.');
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            name,
            email,
            ...(pan !== undefined && { pan }),
            ...(aadhar !== undefined && { aadhar }),
            ...(dob !== undefined && { dob }),
            ...(gender !== undefined && { gender }),
        },
        select: USER_SELECT,
    });

    return updatedUser;
};

export default {
    getUserById,
    updateProfile,
};
