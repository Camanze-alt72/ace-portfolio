import express from 'express';
import {
  getAllReferences,
  getReferenceById,
  addReference,
  updateReference,
  deleteReference
} from '../controllers/referenceController.js';

const router = express.Router();

// GET all references
router.get('/', getAllReferences);

// GET reference by ID
router.get('/:id', getReferenceById);

// POST add new reference
router.post('/', addReference);

// PUT update reference by ID
router.put('/:id', updateReference);

// DELETE remove reference by ID
router.delete('/:id', deleteReference);

export default router;
