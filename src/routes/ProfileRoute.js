import { Router } from 'express';
import { ProfileController } from '../controllers/ProfileController.js';
import { authenticate } from '../middleware/Auth.js';

const router = Router();

router.get('/', authenticate, ProfileController.getProfile);
router.put('/', authenticate, ProfileController.updateProfile);
router.put('/password', authenticate, ProfileController.updateProfilePassword);

export default router;
