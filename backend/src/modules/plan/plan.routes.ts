import { Router } from 'express';
import * as planController from './plan.controller';

const router = Router();

/**
 * @route   GET /api/plans
 * @desc    Get all active subscription plans
 * @access  Public
 */
router.get('/', planController.getPlans);

export default router;
