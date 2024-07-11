const jwt = require("jsonwebtoken");

// Middleware to check if the token is valid
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Assuming token is sent as "Bearer <token>"

  if (!token) {
    return res.status(401).json({ Message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ Message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
