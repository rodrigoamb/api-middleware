import { Task } from '../models/index.js';

const taskRepository = {
  async findAllByUserId(userId) {
    return await Task.findAll({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
    });
  },

  async findByIdAndUserId(taskId, userId) {
    return await Task.findOne({
      where: { id: taskId, user_id: userId },
    });
  },

  async create(taskData) {
    return await Task.create(taskData);
  },

  async update(task, updateData) {
    return await task.update(updateData);
  },

  async delete(task) {
    return await task.destroy();
  },
};

export default taskRepository;
