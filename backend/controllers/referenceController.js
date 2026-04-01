import Reference from "../models/reference.js";
import mongoose from "mongoose";

// helper: map Mongo doc -> required response format (id not _id)
const toRefDTO = (ref) => ({
  name: ref.name,
  title: ref.title,
  company: ref.company,
  message: ref.message,
  id: ref._id.toString(),
});

// Get all references
export const getAllReferences = async (req, res, next) => {
  try {
    const references = await Reference.find();
    res.status(200).json({
      success: true,
      message: "References list retrieved successfully.",
      data: references.map(toRefDTO),
    });
  } catch (error) {
    next(error);
  }
};

// Get reference by ID
export const getReferenceById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const reference = await Reference.findById(id);

    if (!reference) {
      return res.status(404).json({ success: false, message: "Reference not found." });
    }

    res.status(200).json({
      success: true,
      message: "Reference retrieved successfully.",
      data: toRefDTO(reference),
    });
  } catch (error) {
    next(error);
  }
};

// Add new reference
export const addReference = async (req, res, next) => {
  try {
    const { name, title, company, message } = req.body;

    const savedReference = await Reference.create({
      name,
      title,
      company,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: toRefDTO(savedReference),
    });
  } catch (error) {
    next(error);
  }
};

// Update reference by ID
export const updateReference = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    // Build update object with the new field names
    const update = {};

    if (req.body.name !== undefined) update.name = req.body.name;
    if (req.body.title !== undefined) update.title = req.body.title;
    if (req.body.company !== undefined) update.company = req.body.company;
    if (req.body.message !== undefined) update.message = req.body.message;

    const updatedReference = await Reference.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedReference) {
      return res.status(404).json({ success: false, message: "Reference not found." });
    }

    res.status(200).json({
      success: true,
      message: "Reference updated successfully.",
      data: toRefDTO(updatedReference),
    });
  } catch (error) {
    next(error);
  }
};

// Delete reference by ID
export const deleteReference = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const deletedReference = await Reference.findByIdAndDelete(id);

    if (!deletedReference) {
      return res.status(404).json({ success: false, message: "Reference not found." });
    }

    res.status(200).json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};