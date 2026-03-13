import express from 'express'
import { createBeneficiary, getBeneficiaries } from '../controllers/beneficiaryController.js'
import validateBeneficiary from '../middleware/validateBeneficiary.js'

const router = express.Router()

router.get('/', getBeneficiaries)
router.post('/', validateBeneficiary, createBeneficiary)

export default router
