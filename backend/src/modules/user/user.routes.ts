import { Router } from 'express';
import * as userController from './user.controller';
import authMiddleware from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @route   GET /api/user/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authMiddleware, userController.getMe);

/**
 * @route   POST /api/user/profile
 * @desc    Update user profile (name, email)
 * @access  Private
 */
router.post('/profile', authMiddleware, userController.updateProfile);

export default router;
