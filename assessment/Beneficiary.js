// Beneficiary.js
const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: String,
  placeOfBirth: { type: String, required: true },
  gender: String,
  dateOfRegistration: String,
  nationality: String,
  maritalStatus: String,
  settlementCamp: String,
  dateOfJoining: String
})

module.exports = mongoose.model('Beneficiary', beneficiarySchema)
