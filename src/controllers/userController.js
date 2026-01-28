import authService from '../services/authService.js';

const userController = {
  async getUser(req, res) {
    const userId = req.user.id;

    try {
      const user = await authService.getUserById(userId);
      res.json(user);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ message: error.message || 'Error fetching user.' });
    }
  },
};

export default userController;
