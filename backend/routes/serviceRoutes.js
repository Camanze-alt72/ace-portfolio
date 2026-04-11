import express from 'express';
import {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all services (public)
router.get('/', getAllServices);

// GET service by ID (public)
router.get('/:id', getServiceById);

// POST add new service (protected)
router.post('/', verifyToken, addService);

// PUT update service by ID (protected)
router.put('/:id', verifyToken, updateService);

// DELETE remove service by ID (protected)
router.delete('/:id', verifyToken, deleteService);

export default router;
