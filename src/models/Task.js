import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'tasks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

User.hasMany(Task, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'user_id' });

export default Task;
