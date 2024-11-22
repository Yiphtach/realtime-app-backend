import axios from 'axios';
import { MEALDB_API_BASE_URL } from '../dotenvConfig.js';

// Fetch a random meal from the MealDB API
export const getRandomMeal = async (req, res) => {
  try {
    const response = await axios.get(`${MEALDB_API_BASE_URL}/random.php`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching random meal:', error.message);
    res.status(500).json({ error: 'Failed to fetch random meal' });
  }
};
