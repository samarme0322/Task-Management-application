// this handle all task stuff like create, read, update, delete
const Task = require('../models/Task');
const Activity = require('../models/Activity');

// create new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // create task in database
    const task = await Task.create({
      title,
      description,
      // attach to logged in user
      createdBy: req.user._id
    });

    // save this activity
    await Activity.create({
      user: req.user._id,
      userName: req.user.name,
      action: 'task_created',
      detail: req.user.name + ' created task: ' + title
    });

    res.status(201).json({ message: 'task created', task });
  } catch (error) {
    console.log('create task error', error);
    res.status(500).json({ message: 'error creating task' });
  }
};

// get all tasks only for this user
const getMyTasks = async (req, res) => {
  try {
    // find tasks where createdBy is current user
    const tasks = await Task.find({ createdBy: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.log('get tasks error', error);
    res.status(500).json({ message: 'error getting tasks' });
  }
};

// update a task
const updateTask = async (req, res) => {
  try {
    // find task first
    const task = await Task.findById(req.params.id);

    // if task not found
    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }

    // check if this task belong to current user
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'this is not your task, you cannot edit it' });
    }

    // update the task
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // save this activity
    await Activity.create({
      user: req.user._id,
      userName: req.user.name,
      action: 'task_updated',
      detail: req.user.name + ' updated task: ' + task.title
    });

    res.status(200).json({ message: 'task updated', task: updatedTask });
  } catch (error) {
    console.log('update task error', error);
    res.status(500).json({ message: 'error updating task' });
  }
};

// delete a task
const deleteTask = async (req, res) => {
  try {
    // find task first
    const task = await Task.findById(req.params.id);

    // if task not found
    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }

    // check if this task belong to current user
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'this is not your task, you cannot delete it' });
    }

    // delete the task
    await Task.findByIdAndDelete(req.params.id);

    // save this activity
    await Activity.create({
      user: req.user._id,
      userName: req.user.name,
      action: 'task_deleted',
      detail: req.user.name + ' deleted task: ' + task.title
    });

    res.status(200).json({ message: 'task deleted' });
  } catch (error) {
    console.log('delete task error', error);
    res.status(500).json({ message: 'error deleting task' });
  }
};

module.exports = { createTask, getMyTasks, updateTask, deleteTask };
