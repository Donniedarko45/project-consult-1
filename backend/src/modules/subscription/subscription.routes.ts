import { Router } from 'express';
import * as subscriptionController from './subscription.controller';
import authMiddleware from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @route   POST /api/subscriptions/init
 * @desc    Initialize a new subscription
 * @access  Private
 */
router.post('/init', authMiddleware, subscriptionController.initSubscription);

/**
 * @route   GET /api/subscriptions/current
 * @desc    Get current subscription
 * @access  Private
 */
router.get('/current', authMiddleware, subscriptionController.getCurrentSubscription);

export default router;
