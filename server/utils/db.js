const mongoose = require("mongoose");
const URI = process.env.MONGODB_STR;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(`DB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection failed.");
    process.exit(0);
  }
};

module.exports = connectDB;
