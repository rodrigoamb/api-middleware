import { User } from '../models/index.js';

const userRepository = {
  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  },

  async findById(id) {
    return await User.findByPk(id, {
      attributes: ['id', 'name', 'email'],
    });
  },

  async create(userData) {
    return await User.create(userData);
  },
};

export default userRepository;
