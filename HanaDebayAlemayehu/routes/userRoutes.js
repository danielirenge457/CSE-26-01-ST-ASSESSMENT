const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

// This handles POST requests to /api/users/register
router.post('/register', registerUser);

module.exports = router;
