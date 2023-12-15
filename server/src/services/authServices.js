const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const appSecret = process.env.SECRET_KEY || "your-protected-secret-key";

async function signup(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const newUser = new User({ email, password });
    await newUser.save();

    return { message: "Signup successful" };
  } catch (error) {
    throw error;
  }
}

async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, appSecret, {
      expiresIn: "1d",
    });

    return { token };
  } catch (error) {
    throw error;
  }
}

module.exports = { signup, login };
