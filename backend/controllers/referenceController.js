import Reference from "../models/reference.js";
import mongoose from "mongoose";

// helper: map Mongo doc -> required response format (id not _id)
const toRefDTO = (ref) => ({
  firstname: ref.firstname,
  lastname: ref.lastname,
  email: ref.email,
  position: ref.position,
  company: ref.company,
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
    // Accept both snake-case and camelCase from Postman
    const firstname = req.body.firstname ?? req.body.firstName;
    const lastname = req.body.lastname ?? req.body.lastName;

    const { email, position, company } = req.body;

    const savedReference = await Reference.create({
      firstname,
      lastname,
      email,
      position,
      company,
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

    // Accept both name styles, and don't overwrite with undefined
    const update = {};
    const firstname = req.body.firstname ?? req.body.firstName;
    const lastname = req.body.lastname ?? req.body.lastName;

    if (firstname !== undefined) update.firstname = firstname;
    if (lastname !== undefined) update.lastname = lastname;
    if (req.body.email !== undefined) update.email = req.body.email;
    if (req.body.position !== undefined) update.position = req.body.position;
    if (req.body.company !== undefined) update.company = req.body.company;

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