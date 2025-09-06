import Recipe from '../models/Recipe.js';

const recipeController = {};

recipeController.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
    return next();
  } catch (err) {
    return next({
      log: `Error in recipeController.getRecipeById: ${err}`,
      message: 'An error occurred while getting the recipe.',
    });
  }
};

recipeController.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    return next({
      log: `Error in recipeController.getRecipes: ${err}`,
      message: 'An error occurred while retrieving the recipes.',
    });
  }
};

recipeController.addRecipe = async (req, res, next) => {
  try {
    const newRecipe = new Recipe(req.body);
    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (err) {
    return next({
      log: `Error in recipeController.addRecipe: ${err}`,
      message: 'An error occurred while adding the recipe.',
    });
  }
};

recipeController.updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(201).json(updatedRecipe);
  } catch (err) {
    return next({
      log: `Error in recipeController.updateRecipe: ${err}`,
      message: 'An error occurred updating the recipe.',
    });
  }
};

recipeController.deleteRecipe = async (req, res, next) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    return next({
      log: `Error in recipeController.deleteRecipe: ${err}`,
      message: 'An error occurred while deleting the recipe.',
    });
  }
};

export default recipeController;
