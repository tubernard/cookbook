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
      message: { err: 'An error occurred while getting the recipe.' },
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
      message: { err: 'An error occurred while retrieving the recipes.' },
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
      message: { err: 'An error occurred while adding the recipe.' },
    });
  }
};

recipeController.updateRecipe = async (req, res, next) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // Return the updated doc and run schema validation
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(201).json(updatedRecipe);
  } catch (err) {
    return next({
      log: `Error in recipeController.updateRecipe: ${err}`,
      message: { err: 'An error occurred updating the recipe.' },
    });
  }
};

export default recipeController;
