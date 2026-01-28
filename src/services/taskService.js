import taskRepository from '../repositories/taskRepository.js';

const taskService = {
  async getAllTasks(userId) {
    return await taskRepository.findAllByUserId(userId);
  },

  async getTaskById(taskId, userId) {
    const task = await taskRepository.findByIdAndUserId(taskId, userId);
    if (!task) {
      throw { status: 404, message: 'Task not found.' };
    }
    return task;
  },

  async createTask(userId, title, description) {
    return await taskRepository.create({
      user_id: userId,
      title,
      description: description || null,
    });
  },

  async updateTask(taskId, userId, updateData) {
    const task = await taskRepository.findByIdAndUserId(taskId, userId);
    if (!task) {
      throw { status: 404, message: 'Task not found.' };
    }

    const dataToUpdate = {};
    if (updateData.title !== undefined) dataToUpdate.title = updateData.title;
    if (updateData.description !== undefined) dataToUpdate.description = updateData.description;
    if (updateData.completed !== undefined) dataToUpdate.completed = updateData.completed;

    return await taskRepository.update(task, dataToUpdate);
  },

  async deleteTask(taskId, userId) {
    const task = await taskRepository.findByIdAndUserId(taskId, userId);
    if (!task) {
      throw { status: 404, message: 'Task not found.' };
    }

    await taskRepository.delete(task);
    return { message: 'Task deleted successfully!' };
  },
};

export default taskService;
