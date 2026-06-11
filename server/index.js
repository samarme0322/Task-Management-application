// this is main file, it start the server
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// this allow frontend to talk to backend
app.use(cors());

// this make sure we can read json data from request
app.use(express.json());

// connect to mongodb database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('mongodb connected good');
  })
  .catch((err) => {
    console.log('mongodb connection error', err);
  });

// all routes are here
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/adminRoutes');
const activityRoutes = require('./routes/activityRoutes');

// use these routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activity', activityRoutes);

// start server on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('server running on port ' + PORT);
});
