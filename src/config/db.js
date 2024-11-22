import mongoose from 'mongoose';
import { DB_URI } from './dotenvConfig.js';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
