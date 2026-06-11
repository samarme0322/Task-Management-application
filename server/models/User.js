// this is user model, it save user data in database
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // name of user
  name: {
    type: String,
    required: true
  },
  // email of user
  email: {
    type: String,
    required: true,
    unique: true
  },
  // password of user (it will be hashed not plain text)
  password: {
    type: String,
    required: true
  },
  // role can be Admin or User
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User'
  },
  // status can be Active or Inactive
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  // this auto add createdAt and updatedAt dates
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
