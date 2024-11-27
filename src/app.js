// src/app.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import savedRoutes from './routes/savedRoutes.js';

// Connect to the database
connectDB();

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000; // Use the dynamic PORT from Heroku or fallback to 3000

// Enable CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
};
app.use(cors(corsOptions));

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/recipes/saved', savedRoutes); // Routes for saved recipes
app.use('/api/recipes', recipeRoutes); // Routes for recipe operations
app.use('/api/users', userRoutes); // Routes for user operations (login, register)

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;
