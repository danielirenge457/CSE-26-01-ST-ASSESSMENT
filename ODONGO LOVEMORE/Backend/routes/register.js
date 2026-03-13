const express = require("express");
const Registration = require("../models/registration");
const router = express.Router();

// @desc Register a user
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfJoining,
    } = req.body;

    // Backend validation
    if (!firstName || firstName.trim().length < 2 ||
        !lastName || lastName.trim().length < 2 ||
        !placeOfBirth || placeOfBirth.trim().length < 2) {
      return res.status(400).json({ message: "Names and place of birth must be at least 2 characters." });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dob = new Date(dateOfBirth);
    const doj = new Date(dateOfJoining);

    if (dob >= today) {
      return res.status(400).json({ message: "Date of birth must be before date of registration." });
    }

    if (doj <= today) {
      return res.status(400).json({ message: "Date of joining must be after date of registration." });
    }

    const newRegistration = new Registration({
      firstName,
      lastName,
      dateOfBirth: dob,
      placeOfBirth,
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      dateOfJoining: doj,
    });

    await newRegistration.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
