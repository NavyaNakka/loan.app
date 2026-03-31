import express from 'express';
import { sendOtp, verifyOtp, getProfile, updateProfile, requireAuth } from '../controllers/authController.js';

const router = express.Router();


router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

// Profile routes
router.get('/profile', requireAuth, getProfile);
router.put('/profile', requireAuth, updateProfile);

export default router;
