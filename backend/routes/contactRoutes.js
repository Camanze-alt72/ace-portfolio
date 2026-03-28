import express from 'express';
import {
  createContact,
  getAllContacts,
  deleteContact
} from '../controllers/contactController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST create new contact message (public - anyone can submit)
router.post('/', createContact);

// GET all contact messages (protected - needs token)
router.get('/', verifyAdminToken, getAllContacts);

// DELETE contact message by ID (protected - needs token)
router.delete('/:id', verifyAdminToken, deleteContact);

export default router;
