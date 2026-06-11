// this is admin routes file, all these need admin role
const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, updateUserStatus, getAllTasks, adminDeleteTask, getStats } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// GET /api/admin/users - see all users
router.get('/users', protect, adminOnly, getAllUsers);

// DELETE /api/admin/users/:id - delete a user
router.delete('/users/:id', protect, adminOnly, deleteUser);

// PUT /api/admin/users/:id/status - change user active/inactive
router.put('/users/:id/status', protect, adminOnly, updateUserStatus);

// GET /api/admin/tasks - see all tasks
router.get('/tasks', protect, adminOnly, getAllTasks);

// DELETE /api/admin/tasks/:id - delete any task
router.delete('/tasks/:id', protect, adminOnly, adminDeleteTask);

// GET /api/admin/stats - get numbers for dashboard
router.get('/stats', protect, adminOnly, getStats);

module.exports = router;
