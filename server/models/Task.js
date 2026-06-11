// this is task model, it save task data in database
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  // title of task
  title: {
    type: String,
    required: true
  },
  // description of task
  description: {
    type: String,
    default: ''
  },
  // status of task
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  // which user created this task
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // auto add dates
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
