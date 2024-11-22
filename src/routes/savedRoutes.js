import express from 'express';
import SavedRecipe from '../models/SavedRecipe.js'; // Import the Mongoose model

const router = express.Router();

// GET /api/recipes/saved
router.get('/', async (req, res) => {
  try {
    const recipes = await SavedRecipe.find();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching saved recipes:', error.message);
    res.status(500).json({ message: 'Failed to fetch saved recipes' });
  }
});

// POST /api/recipes/saved
router.post('/', async (req, res) => {
  const recipe = req.body;

  try {
    const existingRecipe = await SavedRecipe.findOne({ idMeal: recipe.idMeal });
    if (existingRecipe) {
      return res.status(400).json({ message: 'Recipe is already saved' });
    }

    const newRecipe = new SavedRecipe(recipe);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error.message);
    res.status(500).json({ message: 'Failed to save recipe' });
  }
});

// DELETE /api/recipes/saved/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await SavedRecipe.findOneAndDelete({ idMeal: id });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json({ message: 'Recipe removed' });
  } catch (error) {
    console.error('Error deleting recipe:', error.message);
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
});

export default router;
