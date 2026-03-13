import mongoose from 'mongoose'

const allowedNationalities = ['Ugandan', 'Kenyan', 'Tanzanian', 'Burundian', 'Rwandese', 'Somali', 'South Sudanese']
const allowedMaritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated']
const allowedSettlementCamps = [
  'Gulu settlement camp',
  'Arua settlement camp',
  'Mbarara settlement camp',
  'Kasese settlement camp',
  'Busia settlement camp',
  'Mbale settlement camp',
  'Kigezi settlement camp',
]

// This schema matches the registration form from the frontend.
const beneficiarySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    placeOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      enum: allowedNationalities,
    },
    maritalStatus: {
      type: String,
      required: true,
      trim: true,
      enum: allowedMaritalStatuses,
    },
    settlementCamp: {
      type: String,
      required: true,
      trim: true,
      enum: allowedSettlementCamps,
    },
    settlementDate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema)

export default Beneficiary
