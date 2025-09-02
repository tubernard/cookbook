import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(express.json());

// A sample API route
app.get('/api/recipes', (req, res) => {
  res.json([
    { id: 1, name: 'Spaghetti Bolognese' },
    { id: 2, name: 'Chicken Parmesan' },
  ]);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
