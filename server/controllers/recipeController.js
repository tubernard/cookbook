import Recipe from '../models/Recipe.js';

const recipeController = {};

recipeController.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    next(err);
  }
};

recipeController.addRecipe = async (req, res, next) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (err) {
    next(err);
  }
};

export default recipeController;
