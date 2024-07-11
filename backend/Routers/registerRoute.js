const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../Model/register");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
} = require("firebase/auth");
const multer = require("multer");
const sharp = require("sharp");
const authenticateToken = require("../middleware/authenticateToken"); // Import the middleware

const Router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

const getCurrentFormattedDateTime = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const formattedDate = `${day}_${month}_${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return `${formattedDate}`;
};

const getLastLoggingTime = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const formattedDate = `${day}_${month}_${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return `${formattedDate} ${formattedTime}`;
};

const uploadImageToFirebase = async (file) => {
  const currentFolderName = getCurrentFormattedDateTime();
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = currentDate
    .toTimeString()
    .split(" ")[0]
    .replace(/:/g, "-");
  const uniqueFilename = `${formattedDate}_${formattedTime}_${file.originalname}`;

  const compressedImageBuffer = await sharp(file.buffer)
    .resize({ width: 800 })
    .jpeg({ quality: 80 })
    .toBuffer();

  const storageRef = ref(
    storage,
    `user/${currentFolderName}/${uniqueFilename}`
  );
  await uploadBytes(storageRef, compressedImageBuffer);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

// DELETE route to delete a user by ID
Router.delete("/user/:userId", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOneAndDelete({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user profile route
Router.put(
  "/user/:userId",
  authenticateToken,

  body("name").optional().isLength({ min: 1 }).withMessage("Name is required"),
  body("email").optional().isEmail().withMessage("Email is not valid"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;
    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ userId });

      if (!user) {
        return res.status(404).json({ Message: "User not found" });
      }

      console.log("Updating user:", userId);

      // Update fields only if they are present in the request
      if (name) {
        console.log("Updating name:", name);
        user.name = name;
      }

      if (email) {
        console.log("Updating email:", email);
        user.email = email;
      }

      if (password) {
        console.log("Updating password");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }

      await user.save();
      console.log("User updated successfully:", user);
      res.json({ user });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ Message: "Server error" });
    }
  }
);

// Register route with validation
Router.post(
  "/register",
  body("email")
    .isEmail()
    .withMessage("Email is not valid")
    .custom(async (email) => {
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        throw new Error("Email already exists");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const hashpassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,

        password: hashpassword,

        lastLoggingTime: getCurrentFormattedDateTime(),
      });

      await newUser.save();

      res.status(201).json({
        Message: "User created successfully",

        email: email,

        lastLoggingTime: newUser.lastLoggingTime,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ Message: "Internal Server Error at register side" });
    }
  }
);

// Fetch user details route
Router.get("/user/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }

    res.status(200).json({
      Message: "User details fetched successfully",
      name: user.name,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message, error.stack);
    res
      .status(500)
      .json({ Message: "Internal Server Error", error: error.message });
  }
});

// Login route with validation and token generation
Router.post(
  "/login",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      console.log(email + password);
      let user = await User.findOne({ email: email });
      if (!user) {
        return res.status(409).json({ Message: "Invalid Credential" });
      }

      let passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(409)
          .json({ Message: "Invalid Credential", success: false });
      }

      user.lastLoggingTime = getLastLoggingTime();
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        Message: "User Logged in successfully",
        userId: user.userId,
        user: {
          name: user.name,
          username: user.username,
          email: user.email,

          lastLoggingTime: user.lastLoggingTime,
        },
        success: true,
        token: token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ Message: "Internal Server Error at login side" });
    }
  }
);

// Function to generate a random and strong password
function generateRandomPassword() {
  const length = 12;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+~`|}{[]:;"<>,.?/';
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

// GET route to fetch all users
Router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = Router;
