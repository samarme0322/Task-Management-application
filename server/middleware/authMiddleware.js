// this middleware check if user is logged in
// it check the token from header

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// this protect routes so only logged in user can access
const protect = async (req, res, next) => {
  let token;

  // check if token exist in header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from database and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      // go to next function
      next();
    } catch (error) {
      console.log('token error', error);
      res.status(401).json({ message: 'token is not valid, please login again' });
    }
  }

  // if no token found
  if (!token) {
    res.status(401).json({ message: 'no token found, please login first' });
  }
};

// this middleware only allow admin user
const adminOnly = (req, res, next) => {
  // check if user is admin
  if (req.user && req.user.role === 'Admin') {
    // yes admin, go next
    next();
  } else {
    // not admin, block access
    res.status(403).json({ message: 'only admin can access this, you are not admin' });
  }
};

module.exports = { protect, adminOnly };
