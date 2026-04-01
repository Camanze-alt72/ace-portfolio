import User from "../models/user.js";
import mongoose from "mongoose";

// helper: shape response with id not _id
const toUserDTO = (user) => ({
  firstname: user.firstname,
  lastname: user.lastname,
  created: user.created,
  id: user._id.toString(),
});

// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users list retrieved successfully.",
      data: users.map(toUserDTO),
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully.",
      data: toUserDTO(user),
    });
  } catch (error) {
    next(error);
  }
};

// Add new user
export const addUser = async (req, res, next) => {
  try {
    // Support both firstname/lastname and firstName/lastName formats
    const firstname = req.body.firstname ?? req.body.firstName;
    const lastname = req.body.lastname ?? req.body.lastName;

    if (!firstname || !lastname) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required.",
      });
    }

    const savedUser = await User.create({
      firstname,
      lastname,
      created: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: toUserDTO(savedUser),
    });
  } catch (error) {
    next(error);
  }
};

// Update user by ID
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const update = {};

    const firstname = req.body.firstname ?? req.body.firstName;
    const lastname = req.body.lastname ?? req.body.lastName;

    if (firstname !== undefined) update.firstname = firstname;
    if (lastname !== undefined) update.lastname = lastname;

    const updatedUser = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: toUserDTO(updatedUser),
    });
  } catch (error) {
    next(error);
  }
};

// Delete user by ID
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID." });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};