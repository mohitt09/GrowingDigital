const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4, // Generate a UUID when a new document is created
    unique: true, // Ensure the userId is unique across all documents
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  lastLoggingTime: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
