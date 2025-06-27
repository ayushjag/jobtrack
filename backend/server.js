import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import connectDB from './config/db.js';
import authMiddleware from './middleware/authMiddleware.js';
import jobrouter from './routes/jobRoutes.js';
import authrouter from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authrouter);
app.use('/api/jobs', authMiddleware, jobrouter);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
