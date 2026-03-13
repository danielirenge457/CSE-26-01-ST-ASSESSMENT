const User = require("../models/User");

const registerUser = async (req, res) => {
  try {
    // Create a new user instance 
    const newUser = new User(req.body);

    // Save the new user to the database. 
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      data: savedUser,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ message: "Validation failed.", errors });
    }
    console.error(error);
    res.status(500).json({ message: "Server error during registration." });
  }
};

module.exports = {
  registerUser,
};
