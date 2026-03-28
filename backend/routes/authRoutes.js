import express from 'express';
import { adminLogin } from '../controllers/authController.js';

const router = express.Router();

// POST login
router.post('/login', adminLogin);

export default router;
