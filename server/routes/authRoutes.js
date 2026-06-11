// this is auth routes file
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /api/auth/register - make new account
router.post('/register', register);

// POST /api/auth/login - login
router.post('/login', login);

module.exports = router;
