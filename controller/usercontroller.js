const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      password, // Store the password as plain text (NOT RECOMMENDED)
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ user: user.username }, "hakunamatata", { expiresIn: "1h" });

    // Set the JWT token as a cookie
    res.cookie("token", token, { maxAge: 3600000, httpOnly: true }); // Expiry set to 1 hour (3600000 milliseconds)

    // Return the token as a response
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
