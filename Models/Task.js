const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  category: String,
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Check if model already exists, otherwise create it
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

module.exports = Task;
