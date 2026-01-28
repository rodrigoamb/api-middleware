import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use('/api', router);

export default app;
