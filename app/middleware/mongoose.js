const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = 'mongodb://127.0.0.1:27017/junedd'
  
  if (mongoose.connection.readyState) {
    console.log('Already connected to MongoDBBBBB');
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
