// src/app.js

import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000; // Set the default port to 3000

// CORS middleware: Allow requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend's URL if different
  methods: ['GET', 'POST', 'DELETE'], // Allow specific HTTP methods
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount recipe routes at /api/recipes
app.use('/api/recipes', recipeRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;
