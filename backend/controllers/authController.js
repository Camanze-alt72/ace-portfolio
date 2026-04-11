import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Sign up - create new user with email and password
export const signup = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ 
        message: 'Please provide firstname, lastname, email, and password' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// Sign in - authenticate user and return token
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Please provide email and password' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// Admin login - legacy support for admin-only access
export const adminLogin = (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if password matches the admin password from environment variables
    if (password === process.env.ADMIN_PASSWORD) {
      // Generate a JWT token for admin
      const token = jwt.sign(
        { isAdmin: true },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Admin login successful',
        token: token
      });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
