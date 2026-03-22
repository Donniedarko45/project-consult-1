import { Router } from 'express';
import * as paymentController from './payment.controller';
import authMiddleware from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @route   POST /api/payments/create-order
 * @desc    Create a Cashfree payment order
 * @access  Private
 */
router.post('/create-order', authMiddleware, paymentController.createOrder);

/**
 * @route   POST /api/payments/verify
 * @desc    Verify payment status with Cashfree (fallback for missed webhooks)
 * @access  Private
 */
router.post('/verify', authMiddleware, paymentController.verifyPayment);

export default router;
