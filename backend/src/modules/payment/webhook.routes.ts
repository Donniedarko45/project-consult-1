import { Router } from 'express';
import * as paymentController from '../payment/payment.controller';

const router = Router();

/**
 * @route   POST /api/webhooks/cashfree
 * @desc    Handle Cashfree payment webhooks
 * @access  Public (signature verified)
 */
router.post('/cashfree', paymentController.handleWebhook);

export default router;
