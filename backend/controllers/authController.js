// Admin authentication controller
export const adminLogin = (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Check if password matches the admin password from environment variables
    if (password === process.env.ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = process.env.ADMIN_TOKEN || 'admin_token_secret';

      return res.status(200).json({
        message: 'Login successful',
        token: token
      });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
