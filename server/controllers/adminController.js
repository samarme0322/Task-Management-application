// this is admin controller, only admin can use these functions
const User = require('../models/User');
const Task = require('../models/Task');

// get all users in system
const getAllUsers = async (req, res) => {
  try {
    // find all users, dont send password
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    console.log('get all users error', error);
    res.status(500).json({ message: 'error getting users' });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  try {
    // find user first
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    // delete user
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    console.log('delete user error', error);
    res.status(500).json({ message: 'error deleting user' });
  }
};

// update user status (Active or Inactive)
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // update user status
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    res.status(200).json({ message: 'user status updated', user });
  } catch (error) {
    console.log('update user status error', error);
    res.status(500).json({ message: 'error updating user status' });
  }
};

// get all tasks created by all users
const getAllTasks = async (req, res) => {
  try {
    // get all tasks and also populate user info
    const tasks = await Task.find().populate('createdBy', 'name email');
    res.status(200).json(tasks);
  } catch (error) {
    console.log('get all tasks error', error);
    res.status(500).json({ message: 'error getting all tasks' });
  }
};

// admin delete any task
const adminDeleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'task deleted by admin' });
  } catch (error) {
    console.log('admin delete task error', error);
    res.status(500).json({ message: 'error deleting task' });
  }
};

// get some numbers for dashboard
const getStats = async (req, res) => {
  try {
    // count total users
    const totalUsers = await User.countDocuments();
    // count total tasks
    const totalTasks = await Task.countDocuments();
    // count completed tasks
    const completedTasks = await Task.countDocuments({ status: 'Completed' });
    // count pending tasks
    const pendingTasks = await Task.countDocuments({ status: 'Pending' });

    res.status(200).json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks
    });
  } catch (error) {
    console.log('stats error', error);
    res.status(500).json({ message: 'error getting stats' });
  }
};

module.exports = { getAllUsers, deleteUser, updateUserStatus, getAllTasks, adminDeleteTask, getStats };
