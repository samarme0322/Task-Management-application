// this handle login and register for user
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Activity = require('../models/Activity');

// register new user
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exist
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'email already used by someone' });
    }

    // hash the password so it not plain text
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // if role given use it, else default User
      role: role || 'User'
    });

    // make token for this user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      message: 'user created good',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.log('register error', error);
    res.status(500).json({ message: 'something went wrong in register' });
  }
};

// login existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'email not found' });
    }

    // check if account is active
    if (user.status === 'Inactive') {
      return res.status(403).json({ message: 'your account is blocked by admin' });
    }

    // check if password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'password is wrong' });
    }

    // make token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // save login activity in database
    await Activity.create({
      user: user._id,
      userName: user.name,
      action: 'login',
      detail: user.name + ' logged in'
    });

    res.status(200).json({
      message: 'login success',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.log('login error', error);
    res.status(500).json({ message: 'something went wrong in login' });
  }
};

module.exports = { register, login };
