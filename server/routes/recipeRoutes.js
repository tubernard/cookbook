import express from 'express';
import recipeController from '../controllers/recipeController.js';
import validate from '../middleware/validate.js';
import { recipeSchema } from '../schemas/recipeSchema.js';

const router = express.Router();

router.get('/', recipeController.getRecipes);

router.get('/:id', recipeController.getRecipeById);

router.post('/', validate(recipeSchema), recipeController.addRecipe);

router.put('/:id', recipeController.updateRecipe);

router.delete('/:id', recipeController.deleteRecipe);

export default router;
