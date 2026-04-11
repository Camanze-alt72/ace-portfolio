import express from 'express';
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all projects (public)
router.get('/', getAllProjects);

// GET project by ID (public)
router.get('/:id', getProjectById);

// POST add new project (protected)
router.post('/', verifyToken, addProject);

// PUT update project by ID (protected)
router.put('/:id', verifyToken, updateProject);

// DELETE remove project by ID (protected)
router.delete('/:id', verifyToken, deleteProject);

export default router;
