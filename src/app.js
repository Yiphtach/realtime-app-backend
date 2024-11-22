// src/app.js
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import savedRoutes from './routes/savedRoutes.js';

connectDB();

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000; // Set the default port to 3000

// Enable CORS for frontend requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/recipes/saved', savedRoutes);
app.use('/api/recipes', recipeRoutes); // Routes for recipe operations
app.use('/api/users', userRoutes); // Routes for user operations (login, register)

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;
