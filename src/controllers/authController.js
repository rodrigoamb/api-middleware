import authService from '../services/authService.js';

const authController = {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    try {
      const user = await authService.register(name, email, password);
      res.status(201).json({
        message: 'User created successfully!',
        user,
      });
    } catch (error) {
      const status = error.status || 400;
      res.status(status).json({ message: error.message || 'Error creating user.' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const result = await authService.login(email, password);
      res.json({
        message: 'Login successful!',
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      const status = error.status || 401;
      res.status(status).json({ message: error.message || 'Authentication failed.' });
    }
  },
};

export default authController;
