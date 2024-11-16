import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { ingredient } = req.query;

  if (!ingredient) {
    return res.status(400).json({ message: 'Ingredient query parameter is required' });
  }

  try {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php`, {
      params: { i: ingredient },
    });

    if (!response.data.meals) {
        return res.status(404).json({ message: 'No recipes found for the given ingredient' });
      }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data from TheMealDB API' });
  }
});

export default router;
