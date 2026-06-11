// this controller handle activity logs
const Activity = require('../models/Activity');

// get all activity logs, only admin can call this
const getAllActivity = async (req, res) => {
  try {
    // get all activities sorted by newest first
    const activities = await Activity.find().sort({ createdAt: -1 });
    res.status(200).json(activities);
  } catch (error) {
    console.log('activity log error', error);
    res.status(500).json({ message: 'error getting activity logs' });
  }
};

module.exports = { getAllActivity };
