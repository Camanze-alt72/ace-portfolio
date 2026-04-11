import express from 'express';
import { signup, signin, adminLogin } from '../controllers/authController.js';

const router = express.Router();

// POST sign up - create new user
router.post('/signup', signup);

// POST sign in - authenticate user
router.post('/signin', signin);

// POST admin login - legacy admin access
router.post('/admin/login', adminLogin);

export default router;
