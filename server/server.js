import './loadEnvironment.cjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/connection.js';
import recipeRoutes from './routes/recipeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api/recipes', recipeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}
// Centralized error handling middleware
app.use((err, req, res) => {
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

  // Default to a 500 Internal Server Error
  res.status(500).json({ message: 'An unexpected error occurred' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
