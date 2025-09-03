import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: String,
    required: true,
    trim: true,
  },
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: true,
    trim: true,
  },
  prepTime: { type: Number },
  cookTime: { type: Number },
  numServings: { type: Number },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
