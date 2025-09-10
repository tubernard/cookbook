import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const dbName = `recipe-box-${environment}`;

    const mongoUri = `${process.env.MONGO_URI}${dbName}?retryWrites=true&w=majority&appName=${dbName}`;

    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected successfully to ${dbName}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
