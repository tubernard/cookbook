import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: String, required: true, trim: true },
});

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ingredients: [ingredientSchema],
    instructions: { type: String, required: true, trim: true },
    prepMinutes: { type: Number },
    cookMinutes: { type: Number },
    numServings: { type: Number },
    image: { type: String },
  },
  {
    timestamps: true,
  },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
