import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import chatRoutes from './routes/chat.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use('/api/chat', chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});