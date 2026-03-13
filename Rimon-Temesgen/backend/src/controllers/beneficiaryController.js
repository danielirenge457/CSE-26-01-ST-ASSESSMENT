import Beneficiary from '../models/Beneficiary.js'

// Save one registration from the form.
export const createBeneficiary = async (req, res) => {
  try {
    const beneficiary = await Beneficiary.create(req.body)
    res.status(201).json({
      message: 'Beneficiary registered successfully',
      beneficiary,
    })
  } catch (error) {
    res.status(400).json({
      message: 'Failed to register beneficiary',
      error: error.message,
    })
  }
}

// Get all saved beneficiaries.
export const getBeneficiaries = async (_req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 })
    res.json(beneficiaries)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch beneficiaries',
      error: error.message,
    })
  }
}
