import { Router } from 'express';
import { createRegistration, getRegistrationStatus } from '../controllers/registrationController.js';
import { validateRegistration } from '../middleware/validateRegistration.js';
import { registrationLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// GET /api/registrations/status
router.get('/status', getRegistrationStatus);

// POST /api/registrations
router.post('/', registrationLimiter, validateRegistration, createRegistration);

export default router;
