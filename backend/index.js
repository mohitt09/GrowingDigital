const express = require("express");
const db = require("./Config/DB");
const cors = require("cors");
const registerRoutes = require("./Routers/registerRoute");
const passwordResetRoutes = require("./Routers/passwordResetRoutes");
const uploadMedia = require("./Routers/uploadMedia")
const blogRoutes = require("./Routers/blogRoute");

const contactRoute = require("./Routers/contactRoute");

require("dotenv").config();
const app = express();

app.use(express.json({ limit: "10mb" })); // Increase payload size limit
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
  })
);
db();

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});
app.use('/uploadmedia', uploadMedia);
app.use("/api", passwordResetRoutes);
app.use("/api", registerRoutes);

app.use("/api/blog", blogRoutes);

app.use("/api/contact", contactRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
