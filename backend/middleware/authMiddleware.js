// Simple middleware to verify admin token
export const verifyAdminToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Simple token validation - in production, use JWT
    if (token === process.env.ADMIN_TOKEN) {
      next();
    } else {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
