import mongoose from 'mongoose';

const savedRecipeSchema = new mongoose.Schema({
  idMeal: { type: String, required: true, unique: true },
  strMeal: { type: String, required: true },
  strMealThumb: { type: String, required: true },
  strCategory: { type: String },
  strArea: { type: String },
  strInstructions: { type: String },
  ingredients: { type: Array, default: [] }, // Optional: Store ingredients
});

const SavedRecipe = mongoose.model('SavedRecipe', savedRecipeSchema);

export default SavedRecipe;
