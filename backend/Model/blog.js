const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  blogId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String, required: true },
  slug: { type: String, required: true, unique: true },

  authorName: { type: String, required: true },

  createdAt: { type: String, required: true },

  publish: { type: Boolean, default: false },
});



const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
