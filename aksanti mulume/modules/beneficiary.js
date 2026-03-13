const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  dateOfBirth: {
    type: Date,
    required: true
  },

  placeOfBirth: {
    type: String,
    required: true
  },

  gender: {
    type: String
  },

  nationality: {
    type: String,
    required: true
  },

  maritalStatus: {
    type: String,
    required: true
  },

  settlementCamp: {
    type: String,
    required: true
  },

  joinDate: {
    type: Date,
    required: true
  }

});

module.exports = mongoose.model("Beneficiary", beneficiarySchema);