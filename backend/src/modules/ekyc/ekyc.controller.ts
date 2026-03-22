import { Request, Response, NextFunction } from 'express';
import prisma from '../../prisma/client';
import { KycStatus } from '@prisma/client';
import * as digioService from './digio.service';
import ApiResponse from '../../utils/apiResponse';
import ApiError from '../../utils/apiError';

/**
 * Initiate eKYC verification via Digio
 * POST /api/ekyc/init
 */
export const initKyc = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { identifier, name, dob } = req.body;

        if (!identifier) {
            throw ApiError.badRequest('Customer identifier (PAN or Aadhaar) is required');
        }

        // For PAN verification, name and dob are mandatory
        const cleaned = identifier.trim().toUpperCase();
        const isPan = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(cleaned);
        if (isPan) {
            if (!name) {
                throw ApiError.badRequest('Name is required for PAN verification');
            }
            if (!dob) {
                throw ApiError.badRequest('Date of birth (dd/MM/yyyy) is required for PAN verification');
            }
        }

        // Call Digio to verify the ID directly
        const result = await digioService.verifyIdentity(identifier, name, dob);

        // Update user's KYC status in database
        await prisma.user.update({
            where: { id: req.user.userId },
            data: {
                kycStatus: result.status === 'valid' ? KycStatus.VERIFIED : KycStatus.FAILED,
                pan: result.type === 'PAN' ? identifier.toUpperCase() : undefined,
                aadhar: result.type === 'AADHAAR' ? identifier : undefined,
            },
        });

        ApiResponse.success(res, {
            type: result.type,
            status: result.status,
            details: result.details,
        }, `${result.type} verification completed`);
    } catch (error) {
        next(error);
    }
};

/**
 * Get eKYC status
 * GET /api/ekyc/status
 */
export const getKycStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                kycStatus: true,
                digioKycId: true,
                pan: true,
            },
        });

        if (!user) {
            throw ApiError.notFound('User not found');
        }

        ApiResponse.success(res, {
            kycStatus: user.kycStatus,
            digioKycId: user.digioKycId,
            hasPan: !!user.pan,
        }, 'KYC status retrieved');
    } catch (error) {
        next(error);
    }
};

/**
 * Update eKYC status after Digio SDK callback
 * POST /api/ekyc/update-status
 */
export const updateKycStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            throw ApiError.unauthorized();
        }

        const { kycId, status } = req.body;

        if (!kycId || !status) {
            throw ApiError.badRequest('kycId and status are required');
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });

        if (!user || user.digioKycId !== kycId) {
            throw ApiError.badRequest('Invalid KYC request');
        }

        // Map Digio status to our KycStatus
        let kycStatus: KycStatus;
        if (status === 'success' || status === 'approved') {
            kycStatus = KycStatus.VERIFIED;
        } else if (status === 'failed' || status === 'rejected') {
            kycStatus = KycStatus.FAILED;
        } else {
            kycStatus = KycStatus.PENDING;
        }

        await prisma.user.update({
            where: { id: req.user.userId },
            data: { kycStatus },
        });

        ApiResponse.success(res, {
            kycStatus,
        }, `KYC status updated to ${kycStatus}`);
    } catch (error) {
        next(error);
    }
};

export default {
    initKyc,
    getKycStatus,
    updateKycStatus,
};
