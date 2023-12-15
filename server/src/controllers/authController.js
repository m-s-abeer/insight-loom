const authServices = require("../services/authServices");

async function signup(req, res) {
  try {
    const { email, password } = req.body;
    await authServices.signup(email, password);

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message || "Bad Request" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token } = await authServices.login(email, password);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ error: error.message || "Unauthorized" });
  }
}

module.exports = { signup, login };
