import express from 'express';
import Recipe from '../models/Recipe.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  try {
    const newRecipe = new Recipe({
      name,
      ingredients,
      instructions,
    });

    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.err(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
