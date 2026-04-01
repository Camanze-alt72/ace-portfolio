import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


import firebase from './config/firebase.js';

firebase();
// Import routes
import referenceRoutes from './routes/referenceRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/references', referenceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      references: '/api/references',
      projects: '/api/projects',
      services: '/api/services',
      users: '/api/users'
    }
  });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'Route not found'));
});

// Global error handler (must be last middleware)
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: req.app.get('env') === 'development' ? err.stack : {}
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
