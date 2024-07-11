const express = require("express");
const { body, validationResult } = require("express-validator");
const { nanoid } = require("nanoid");
const Blog = require("../Model/blog");
const moment = require("moment");
const authenticateToken = require("../middleware/authenticateToken"); // Import the middleware

const router = express.Router();

// PUT route to update the publish status of a blog
router.put("/:blogId/publish", authenticateToken, async (req, res) => {
  try {
    const { blogId } = req.params;
    const { publish } = req.body;

    // Find the blog by its ID
    const blog = await Blog.findOne({ blogId });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Update the publish status
    blog.publish = publish;

    await blog.save();

    res.json({ message: "Blog publish status updated successfully", blog });
  } catch (error) {
    console.error("Error updating blog publish status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put(
  "/editblog/:blogId",
  authenticateToken,
  [
    // Validate title
    body("title").trim().isLength({ min: 1 }).withMessage("Title is required"),

    // Validate authorName
    body("authorName")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Author name is required"),

    // Validate mediaUrl
    body("mediaUrl")
      .notEmpty()
      .withMessage("Media URL is required")
      .isURL({ protocols: ["http", "https"] })
      .withMessage("Invalid media URL format"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // If there are validation errors, return them to the frontend
        return res.status(400).json({ errors: errors.array() });
      }

      const { blogId } = req.params;
      const {
        title,
        content,
        mediaUrl,
        
        authorName,
        slug,
      } = req.body;

      // Find the blog by its ID in the database
      const blog = await Blog.findOne({ blogId });

      if (!blog) {
        // If the blog is not found, return a 404 response to the frontend
        return res.status(404).json({ message: "Blog not found" });
      }

      // Update the blog
      blog.title = title;
      blog.content = content;
      blog.mediaUrl = mediaUrl;
     
      blog.authorName = authorName;
      blog.slug = slug;
      blog.updatedAt = new Date();

      await blog.save();

      res.json({ message: "Blog updated successfully", blog });
    } catch (error) {
      // If an error occurs during the update process, return a 500 response
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE route to delete a blog by blogId
router.delete("/editblog/:blogId", authenticateToken, async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const deletedBlog = await Blog.findOneAndDelete({ blogId }); // Adjust the delete logic to use blogId
    if (!deletedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }
    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Failed to delete blog" });
  }
});

// POST route to create a new blog
router.post(
  "/",
  authenticateToken,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("mediaUrl").notEmpty().withMessage("Media URL is required"),
    body("authorName").notEmpty().withMessage("Author Name is required"),
    body("slug").notEmpty().withMessage("Slug is required"),
    // Additional validation
    body("slug").custom(async (value) => {
      const existingBlog = await Blog.findOne({ slug: value });
      if (existingBlog) {
        throw new Error("Slug already exists");
      }
    }),
    body("mediaUrl").custom(async (value) => {
      const existingBlog = await Blog.findOne({ mediaUrl: value });
      if (existingBlog) {
        throw new Error("Media URL already exists");
      }
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        title,
        content,
        mediaUrl,
        authorName,
        slug,
      } = req.body;

      const blogId = nanoid();
      const createdAt = moment().format("DD/MM/YYYY HH:mm:ss");
      const newBlog = new Blog({
        title,
        blogId,
        content,
        mediaUrl,
        authorName,
        slug,
        createdAt,
      });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: error.message });
    }
  }
);


// GET route to fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// GET a blog by blogId
// GET a blog by slug
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
