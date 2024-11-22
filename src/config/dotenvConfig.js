import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MEALDB_API_BASE_URL = process.env.MEALDB_API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';
export const DB_URI = process.env.DB_URI; // Use the MongoDB URI from .env
