import Project from "../models/project.js";
import mongoose from "mongoose";

const toProjectDTO = (project) => ({
  title: project.title,
  completion: project.completion,
  description: project.description,
  id: project._id.toString(),
});

// Get all projects
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: projects.map(toProjectDTO),
    });
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project retrieved successfully.",
      data: toProjectDTO(project),
    });
  } catch (error) {
    next(error);
  }
};

// Add new project
export const addProject = async (req, res, next) => {
  try {
    const { title, completion, description } = req.body;

    const savedProject = await Project.create({
      title,
      completion, // Postman sends YYYY-MM-DD string :contentReference[oaicite:2]{index=2}
      description,
    });

    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: toProjectDTO(savedProject),
    });
  } catch (error) {
    next(error);
  }
};

// Update project by ID
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completion, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const update = {};
    if (title !== undefined) update.title = title;
    if (completion !== undefined) update.completion = completion;
    if (description !== undefined) update.description = description;

    const updatedProject = await Project.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Delete project by ID
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Project not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};