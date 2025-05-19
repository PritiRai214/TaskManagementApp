const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, dueDate, category } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      category,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.user.toString() !== req.user.id)
    return res.status(401).json({ message: 'Not authorized' });

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  if (task.user.toString() !== req.user.id)
    return res.status(401).json({ message: 'Not authorized' });

  await task.remove();
  res.status(200).json({ message: 'Task removed' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
