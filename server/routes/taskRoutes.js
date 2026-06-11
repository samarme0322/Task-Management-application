// this is task routes file
const express = require('express');
const router = express.Router();
const { createTask, getMyTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// all task routes need user to be logged in (protect middleware)

// POST /api/tasks - create task
router.post('/', protect, createTask);

// GET /api/tasks - get my tasks
router.get('/', protect, getMyTasks);

// PUT /api/tasks/:id - update task
router.put('/:id', protect, updateTask);

// DELETE /api/tasks/:id - delete task
router.delete('/:id', protect, deleteTask);

module.exports = router;
