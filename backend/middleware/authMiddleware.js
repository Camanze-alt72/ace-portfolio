import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Verify JWT token
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin || false;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Legacy admin token verification (for backward compatibility)
export const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Try JWT first
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded.isAdmin) {
        req.isAdmin = true;
        next();
        return;
      }
    } catch (jwtError) {
      // Fall through to legacy check
    }

    // Legacy: Simple token validation
    if (token === process.env.ADMIN_TOKEN) {
      req.isAdmin = true;
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
