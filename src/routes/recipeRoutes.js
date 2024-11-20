import express from 'express';
import axios from 'axios';

const savedRecipes = [];
const router = express.Router();
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Helper function for making API requests
const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('API Fetch Error:', error.message);
    throw new Error('Failed to fetch data from TheMealDB API');
  }
};

// Search recipes by ingredient
router.get('/search', async (req, res) => {
  const { ingredient } = req.query; // Extract 'ingredient' from query parameters
  if (!ingredient || ingredient.trim() === '') {
    return res.status(400).json({ message: 'Ingredient parameter is required' });
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/filter.php`, { params: { i: ingredient } });
    res.json(response.data); // Return the API response to the client
  } catch (error) {
    console.error('Error fetching recipes by ingredient:', error.message);
    res.status(500).json({ message: 'Failed to fetch recipes by ingredient' });
  }
});

// Search meal by name
router.get('/search', async (req, res) => {
  const { s } = req.query; // Meal name
  try {
    const data = await fetchFromAPI('/search.php', { s });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List all meals by first letter
router.get('/by-letter', async (req, res) => {
  const { f } = req.query; // First letter
  try {
    const data = await fetchFromAPI('/search.php', { f });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lookup full meal details by ID
router.get('/details/:id', async (req, res) => {
  const { id } = req.params; // Meal ID
  try {
    const data = await fetchFromAPI('/lookup.php', { i: id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lookup a single random meal
router.get('/random', async (req, res) => {
  try {
    const data = await fetchFromAPI('/random.php');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List all meal categories
router.get('/categories', async (req, res) => {
  try {
    const data = await fetchFromAPI('/categories.php');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List all Categories, Area, Ingredients
router.get('/lists', async (req, res) => {
  const { type } = req.query; // Type can be c (Category), a (Area), or i (Ingredient)
  if (!['c', 'a', 'i'].includes(type)) {
    return res.status(400).json({ message: 'Invalid list type. Use c, a, or i.' });
  }

  try {
    const data = await fetchFromAPI('/list.php', { [type]: 'list' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter meals by main ingredient
router.get('/filter/ingredient', async (req, res) => {
  const { i } = req.query; // Ingredient name
  try {
    const data = await fetchFromAPI('/filter.php', { i });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter meals by category
router.get('/filter/category', async (req, res) => {
  const { c } = req.query; // Category name
  try {
    const data = await fetchFromAPI('/filter.php', { c });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter meals by area
router.get('/filter/area', async (req, res) => {
  const { a } = req.query; // Area name
  try {
    const data = await fetchFromAPI('/filter.php', { a });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all saved recipes
router.get('/saved', (req, res) => {
  try {
    res.json(savedRecipes); // Ensure `savedRecipes` is defined and accessible
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch saved recipes' });
  }
});

export default router;
