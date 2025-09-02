import './loadEnvironment.cjs';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/connection.js';
// import recipeRoutes from './routes/recipeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();
const PORT = 3001;

app.use(express.json());

// app.use('/api/recipes', recipeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
