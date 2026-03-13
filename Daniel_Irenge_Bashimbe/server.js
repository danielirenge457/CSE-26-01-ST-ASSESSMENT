const express = require('express'); 
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging for all requests (helps diagnose 405 issues)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Serve static files
app.use(express.static(__dirname));

// MongoDB Connection
const dbUrl = 'mongodb://127.0.0.1:27017/Beneficiary_formDB';

mongoose.connect(dbUrl, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
})
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    // Start server only after the DB connection is ready
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

// Beneficiary Schema
const beneficiarySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: String,
  placeOfBirth: String,
  gender: String,
  dateOfRegistration: String,
  nationality: String,
  maritalStatus: String,
  settlementCamp: String,
  dateOfJoining: String
});

const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);

// CORS & preflight handler (helps avoid Method Not Allowed from preflight requests)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Middleware: ensure database is connected before handling requests
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Database not connected. Please try again later.",
    });
  }
  next();
});

// POST - Register Beneficiary
app.post('/beneficiaries', async (req, res) => {
  try {
    const beneficiary = new Beneficiary(req.body);
    await beneficiary.save();
    res.status(201).json({
      message: "Beneficiary registered successfully",
      data: beneficiary
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving beneficiary",
      error: error.message
    });
  }
});

// GET - View All Beneficiaries
app.get('/beneficiaries', async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find();
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

