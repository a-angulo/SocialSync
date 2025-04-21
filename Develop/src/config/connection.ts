import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async (): Promise<Connection> => {
  const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/social_network_API_DB';
  try {
    // Avoid multiple connections:
    if (mongoose.connection.readyState !== 0) {
      return mongoose.connection;
    }
    await mongoose.connect(uri);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (err: unknown) {
    console.error('Database connection error:', err);
    // Preserve original error message
    if (err instanceof Error) {
      throw new Error(`Database connection failed: ${err.message}`);
    } else {
      throw new Error('Database connection failed.');
    }
  }
};

export default connectDB;