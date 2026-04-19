const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`⚠️  Local MongoDB Connection Error: ${error.message}`);
    console.log(`⏳ Starting MongoDB Memory Server instead...`);
    try {
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`✅ MongoDB Memory Server Connected: ${conn.connection.host}`);
    } catch (memError) {
      console.error(`❌ MongoDB Memory Server Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
