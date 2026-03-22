import { Router } from 'express';
import * as ekycController from './ekyc.controller';
import * as esignController from './esign.controller';
import authMiddleware from '../../middlewares/auth.middleware';

const router = Router();

// ==========================================
// eKYC Routes (PAN / Aadhaar verification)
// ==========================================

/**
 * @route   POST /api/ekyc/init
 * @desc    Initiate eKYC verification via Digio
 * @access  Private
 */
router.post('/init', authMiddleware, ekycController.initKyc);

/**
 * @route   GET /api/ekyc/status
 * @desc    Get current eKYC status
 * @access  Private
 */
router.get('/status', ekycController.getKycStatus);

/**
 * @route   POST /api/ekyc/update-status
 * @desc    Update eKYC status after Digio SDK callback
 * @access  Private
 */
router.post('/update-status', ekycController.updateKycStatus);

// ==========================================
// DigiSign Routes (Agreement e-signing)
// ==========================================

/**
 * @route   POST /api/ekyc/sign/init
 * @desc    Initiate e-sign for a subscription agreement
 * @access  Private
 * @body    { subscriptionId: string }
 */
router.post('/sign/init', authMiddleware, esignController.initSign);

/**
 * @route   GET /api/ekyc/sign/status/:subscriptionId
 * @desc    Get e-sign status for a subscription
 * @access  Private
 */
router.get('/sign/status/:subscriptionId', authMiddleware, esignController.getSignStatus);

/**
 * @route   POST /api/ekyc/sign/update-status
 * @desc    Update sign status after frontend Digio SDK callback
 * @access  Private
 * @body    { subscriptionId: string, digioDocId: string, status: string }
 */
router.post('/sign/update-status', authMiddleware, esignController.updateSignStatus);

/**
 * @route   POST /api/ekyc/sign/webhook
 * @desc    Digio webhook callback for e-sign completion
 * @access  Public (Digio server-to-server)
 */
router.post('/sign/webhook', esignController.handleSignWebhook);

export default router;
