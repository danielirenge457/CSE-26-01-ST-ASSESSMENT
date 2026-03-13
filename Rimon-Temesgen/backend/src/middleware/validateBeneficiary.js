const allowedNationalities = [
  'Ugandan',
  'Kenyan',
  'Tanzanian',
  'Burundian',
  'Rwandese',
  'Somali',
  'South Sudanese',
]

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

const namePattern = /^[A-Za-z][A-Za-z\s'-]{1,}$/

const parseDate = (value) => {
  if (!value || typeof value !== 'string') return null

  const match = value.trim().match(/^(\d{4})\s*\/\s*(\d{2})\s*\/\s*(\d{2})$/)
  if (!match) return null

  const [, year, month, day] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))

  const isValidDate =
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day)

  return isValidDate ? date : null
}

const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

// This middleware checks the same rules used in the frontend form.
const validateBeneficiary = (req, res, next) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    placeOfBirth,
    gender,
    nationality,
    maritalStatus,
    settlementCamp,
    settlementDate,
  } = req.body

  if (!firstName?.trim()) {
    return res.status(400).json({ message: 'First name is required' })
  }

  if (!namePattern.test(firstName.trim())) {
    return res.status(400).json({ message: 'First name is invalid' })
  }

  if (!lastName?.trim()) {
    return res.status(400).json({ message: 'Last name is required' })
  }

  if (!namePattern.test(lastName.trim())) {
    return res.status(400).json({ message: 'Last name is invalid' })
  }

  if (!dateOfBirth?.trim()) {
    return res.status(400).json({ message: 'Date of birth is required' })
  }

  const birthDate = parseDate(dateOfBirth)
  if (!birthDate) {
    return res.status(400).json({ message: 'Date of birth is invalid' })
  }

  if (birthDate >= getToday()) {
    return res.status(400).json({ message: 'Date of birth must be before registration date' })
  }

  if (!placeOfBirth?.trim()) {
    return res.status(400).json({ message: 'Place of birth is required' })
  }

  if (placeOfBirth.trim().length < 3) {
    return res.status(400).json({ message: 'Place of birth is invalid' })
  }

  if (!gender || !['male', 'female'].includes(gender)) {
    return res.status(400).json({ message: 'Gender is invalid' })
  }

  if (!allowedNationalities.includes(nationality)) {
    return res.status(400).json({ message: 'Nationality is invalid' })
  }

  if (!allowedMaritalStatuses.includes(maritalStatus)) {
    return res.status(400).json({ message: 'Marital status is invalid' })
  }

  if (!allowedSettlementCamps.includes(settlementCamp)) {
    return res.status(400).json({ message: 'Settlement camp is invalid' })
  }

  if (!settlementDate?.trim()) {
    return res.status(400).json({ message: 'Settlement date is required' })
  }

  const joiningDate = parseDate(settlementDate)
  if (!joiningDate) {
    return res.status(400).json({ message: 'Settlement date is invalid' })
  }

  if (joiningDate < getToday()) {
    return res.status(400).json({ message: 'Settlement date must be on or after registration date' })
  }

  next()
}

export default validateBeneficiary
