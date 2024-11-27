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
const PORT = process.env.PORT || 3000; // Use the dynamic PORT from Heroku

// Enable CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Update this for production
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

app.get('/', (req, res) => {
  res.send('Welcome to the Realtime-App Backend API');
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Realtime-App Backend API',
    endpoints: {
      recipes: '/api/recipes',
      savedRecipes: '/api/recipes/saved',
      users: '/api/users',
    },
  });
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// Graceful shutdown for Heroku dyno restarts
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Closing server...');
  server.close(() => {
    console.log('Server closed gracefully.');
    process.exit(0); // Exit the process cleanly
  });
});

export default app;
