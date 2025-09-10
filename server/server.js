import './loadEnvironment.cjs';
import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import recipeRoutes from './routes/recipeRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import isAuthenticated from './middleware/authenticate.js';

const app = express();
const PORT = 3001;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', isAuthenticated, recipeRoutes);
app.use('/api/upload', isAuthenticated, uploadRoutes);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle Mongoose Errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ message: messages.join(' ') });
  }

  if (err.name === 'CastError') {
    return res
      .status(400)
      .json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  if (err.message) {
    return res.status(500).json({ message: err.message });
  }

  // Default to a 500 Internal Server Error
  res.status(500).json({ message: 'An unexpected error occurred' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

export default app;
