const Beneficiary = require("../modules/beneficiary");

const registerBeneficiary = async (req, res) => {
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
      joinDate,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !placeOfBirth ||
      !nationality ||
      !maritalStatus ||
      !settlementCamp ||
      !joinDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const beneficiary = new Beneficiary({
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      nationality,
      maritalStatus,
      settlementCamp,
      joinDate,
    });

    await beneficiary.save();

    res.status(201).json({
      message: "Beneficiary registered successfully",
      beneficiary,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};



module.exports = {
  registerBeneficiary
};
