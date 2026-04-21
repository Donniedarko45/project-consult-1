import { Router } from 'express';
import { submitContactQuery } from './contact.controller';

const router = Router();

// POST /contact — public, no auth required
router.post('/', submitContactQuery);

export default router;
