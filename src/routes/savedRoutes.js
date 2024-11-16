import express from 'express';

const router = express.Router();
const savedRecipes = []; // In-memory storage for saved recipes

// GET /api/recipes/saved
router.get('/', (req, res) => {
  res.json(savedRecipes);
});

// POST /api/recipes/saved
router.post('/', (req, res) => {
  const recipe = req.body;

  if (savedRecipes.find((r) => r.idMeal === recipe.idMeal)) {
    return res.status(400).json({ message: 'Recipe is already saved' });
  }

  savedRecipes.push(recipe);
  res.status(201).json(recipe);
});

// DELETE /api/recipes/saved/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = savedRecipes.findIndex((r) => r.idMeal === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  savedRecipes.splice(index, 1);
  res.status(200).json({ message: 'Recipe removed' });
});

export default router;
