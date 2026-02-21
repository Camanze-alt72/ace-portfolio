import express from 'express';
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// GET all projects
router.get('/', getAllProjects);

// GET project by ID
router.get('/:id', getProjectById);

// POST add new project
router.post('/', addProject);

// PUT update project by ID
router.put('/:id', updateProject);

// DELETE remove project by ID
router.delete('/:id', deleteProject);

export default router;
