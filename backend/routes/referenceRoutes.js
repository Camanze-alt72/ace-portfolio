import express from 'express';
import {
  getAllReferences,
  getReferenceById,
  addReference,
  updateReference,
  deleteReference
} from '../controllers/referenceController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all references (public)
router.get('/', getAllReferences);

// GET reference by ID (public)
router.get('/:id', getReferenceById);

// POST add new reference (protected)
router.post('/', verifyToken, addReference);

// PUT update reference by ID (protected)
router.put('/:id', verifyToken, updateReference);

// DELETE remove reference by ID (protected)
router.delete('/:id', verifyToken, deleteReference);

export default router;
