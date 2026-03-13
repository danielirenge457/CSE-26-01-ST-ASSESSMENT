const express = require("express");

const router = express.Router();

const {registerBeneficiary} = require("../controllers/beneficiaryControllers");


router.post("/register", registerBeneficiary);



module.exports = router;