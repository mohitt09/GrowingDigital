// db.js
const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
  try {
    console.log("Attempting to connect to MongoDB with URI:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = db;
