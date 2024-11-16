import express from 'express';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);

export default app;
