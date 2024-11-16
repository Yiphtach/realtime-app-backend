// src/routes/recipeRoutes.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// src/routes/recipeRoutes.js
router.get('/search', async (req, res) => {
    const { ingredient } = req.query;
  
    if (!ingredient || ingredient.trim() === '') {
      return res.status(400).json({ message: 'Ingredient query parameter is required' });
    }
  
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php', {
        params: { i: ingredient },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching recipes by ingredient:', error.message);
      res.status(500).json({ message: 'Failed to fetch recipes' });
    }
  });

// GET /api/recipes/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php`, {
      params: { i: id },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error.message);
    res.status(500).json({ message: 'Failed to fetch recipe details' });
  }
});

// Temporary in-memory storage for saved recipes
const savedRecipes = [];

// Save a recipe
router.post('/save', (req, res) => {
  const { id, title, image } = req.body;

  // Check if recipe is already saved
  const exists = savedRecipes.find((recipe) => recipe.id === id);
  if (exists) {
    return res.status(400).json({ message: 'Recipe already saved' });
  }

  savedRecipes.push({ id, title, image });
  res.status(201).json({ message: 'Recipe saved successfully', savedRecipes });
});

// Get all saved recipes
router.get('/saved', (req, res) => {
  res.json(savedRecipes);
});


export default router;
