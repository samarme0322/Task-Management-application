// this is activity log model, it save all user activity
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  // which user did this activity
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // what user name
  userName: {
    type: String
  },
  // what type of activity
  action: {
    type: String,
    // these are all possible actions
    enum: ['login', 'task_created', 'task_updated', 'task_deleted'],
    required: true
  },
  // some extra detail about what happened
  detail: {
    type: String,
    default: ''
  }
}, {
  // auto add dates so we know when it happened
  timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
