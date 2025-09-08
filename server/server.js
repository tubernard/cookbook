import './loadEnvironment.cjs';
import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './db/connection.js';
import recipeRoutes from './routes/recipeRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import userRoutes from './routes/userRoutes.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import isAuthenticated from './middleware/authenticate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', isAuthenticated, recipeRoutes);
app.use('/api/upload', isAuthenticated, uploadRoutes);

// // Static React Routes
// if (process.env.NODE_ENV === 'production') {
//   const clientDistPath = path.join(__dirname, '../client/dist');
//   app.use(express.static(clientDistPath));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(clientDistPath, 'index.html'));
//   });
// }

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
