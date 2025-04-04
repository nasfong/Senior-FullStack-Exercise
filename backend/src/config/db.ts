import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('MongoDB connected');

    // Global transformation for _id to id, remove __v, and reorder the fields
    mongoose.set('toJSON', {
      transform: (doc, ret) => {
        ret.id = ret._id;  // Rename _id to id
        delete ret._id;     // Remove the original _id field
        delete ret.__v;     // Remove the __v field
        return { id: ret.id, ...ret };  // Return id at the top
      }
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
