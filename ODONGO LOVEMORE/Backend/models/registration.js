const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  placeOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },

  nationality: {
    type: String,
    enum: [
      "Ugandan",
      "Kenyan",
      "Tanzanian",
      "Burundian",
      "Rwandese",
      "Somali",
      "South Sudanese",
    ],
    required: true,
  },

  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed", "Separated"],
    required: true,
  },

  settlementCamp: {
    type: String,
    enum: [
      "Gulu settlement camp",
      "Arua settlement camp",
      "Mbarara settlement camp",
      "Kasese settlement camp",
      "Busia settlement camp",
      "Mbale settlement camp",
      "Kigezi settlement camp",
    ],
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
});

const Registration = mongoose.model("Registration", registrationSchema);

module.exports = Registration;
