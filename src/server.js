import app from './app.js';
import { sequelize } from './models/index.js';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL!');

    await sequelize.sync();
    console.log('Tables verified/created successfully!');

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

startServer();
