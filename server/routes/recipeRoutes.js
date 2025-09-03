import express from 'express';
import recipeController from '../controllers/recipeController.js';
import validate from '../middleware/validate.js';
import { recipeSchema } from '../../shared/schemas/recipeSchema.js';

const router = express.Router();

router.post('/', validate(recipeSchema), recipeController.addRecipe);

router.get('/', recipeController.getRecipes);

export default router;
