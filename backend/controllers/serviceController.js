import Service from "../models/service.js";
import mongoose from "mongoose";

// Get all services
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    const data = services.map((service) => ({
      title: service.title,
      description: service.description,
      id: service._id.toString(),
    }));

    res.status(200).json({
      success: true,
      message: "Services list retrieved successfully.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Get service by ID
export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    res.status(200).json({
      success: true,
      message: "Service retrieved successfully.",
      data: {
        title: service.title,
        description: service.description,
        id: service._id.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Add new service
export const addService = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const savedService = await Service.create({ title, description });

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: {
        title: savedService.title,
        description: savedService.description,
        id: savedService._id.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update service by ID
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    // Avoid overwriting with undefined
    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;

    const updatedService = await Service.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Delete service by ID
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ success: false, message: "Service not found." });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};