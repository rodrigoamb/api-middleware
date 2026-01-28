import taskService from '../services/taskService.js';

const taskController = {
  async getAllTasks(req, res) {
    const userId = req.user.id;

    try {
      const tasks = await taskService.getAllTasks(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks.' });
    }
  },

  async getTaskById(req, res) {
    const userId = req.user.id;
    const taskId = req.params.id;

    try {
      const task = await taskService.getTaskById(taskId, userId);
      res.json(task);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ message: error.message || 'Error fetching task.' });
    }
  },

  async createTask(req, res) {
    const userId = req.user.id;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    try {
      const task = await taskService.createTask(userId, title, description);
      res.status(201).json({
        message: 'Task created successfully!',
        task,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating task.' });
    }
  },

  async updateTask(req, res) {
    const userId = req.user.id;
    const taskId = req.params.id;
    const { title, description, completed } = req.body;

    try {
      const task = await taskService.updateTask(taskId, userId, { title, description, completed });
      res.json({
        message: 'Task updated successfully!',
        task,
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ message: error.message || 'Error updating task.' });
    }
  },

  async deleteTask(req, res) {
    const userId = req.user.id;
    const taskId = req.params.id;

    try {
      const result = await taskService.deleteTask(taskId, userId);
      res.json(result);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({ message: error.message || 'Error deleting task.' });
    }
  },
};

export default taskController;
