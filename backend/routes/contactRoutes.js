import express from 'express';
import {
  createContact,
  getAllContacts,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// POST create new contact message
router.post('/', createContact);

// GET all contact messages
router.get('/', getAllContacts);

// DELETE contact message by ID
router.delete('/:id', deleteContact);

export default router;
