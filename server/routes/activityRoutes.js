// this is activity routes file
const express = require('express');
const router = express.Router();
const { getAllActivity } = require('../controllers/activityController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// GET /api/activity - get all activity logs (admin only)
router.get('/', protect, adminOnly, getAllActivity);

module.exports = router;
