import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MEALDB_API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
