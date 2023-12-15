const jwt = require("jsonwebtoken");

const appSecret = process.env.SECRET_KEY || "your-protected-secret-key";

function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing Token" });
  }

  try {
    const decodedToken = jwt.verify(token, appSecret);

    req.user = {
      id: decodedToken.userId,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid Token" });
  }
}

module.exports = { authenticateUser };
