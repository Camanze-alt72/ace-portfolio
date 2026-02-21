import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET user by ID
router.get('/:id', getUserById);

// POST add new user
router.post('/', addUser);

// PUT update user by ID
router.put('/:id', updateUser);

// DELETE remove user by ID
router.delete('/:id', deleteUser);

export default router;
