import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '2h';

const authService = {
  async register(name, email, password) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw { status: 400, message: 'Email already registered.' };
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ name, email, password: hash });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  async login(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw { status: 401, message: 'User not found.' };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw { status: 401, message: 'Invalid password.' };
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  },

  async getUserById(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw { status: 404, message: 'User not found.' };
    }
    return user;
  },
};

export default authService;
