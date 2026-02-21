import express from 'express';
import {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

// GET all services
router.get('/', getAllServices);

// GET service by ID
router.get('/:id', getServiceById);

// POST add new service
router.post('/', addService);

// PUT update service by ID
router.put('/:id', updateService);

// DELETE remove service by ID
router.delete('/:id', deleteService);

export default router;
