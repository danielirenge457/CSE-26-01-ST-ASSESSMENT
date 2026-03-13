const mongoose = require('mongoose');

// Replace this with your actual MongoDB connection string
const uri = "mongodb://127.0.0.1:27017/Beneficiary_formDB";

// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully!"))
.catch((err) => console.error(" MongoDB connection error:", err));

// Define Beneficiary Schema
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

// Create Beneficiary model
const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

// Export model for use in server.js
module.exports = Beneficiary;