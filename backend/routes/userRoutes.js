import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all users (public)
router.get('/', getAllUsers);

// GET user by ID (public)
router.get('/:id', getUserById);

// POST add new user (public - for sign up)
router.post('/', addUser);

// PUT update user by ID (protected)
router.put('/:id', verifyToken, updateUser);

// DELETE remove user by ID (protected)
router.delete('/:id', verifyToken, deleteUser);

export default router;
