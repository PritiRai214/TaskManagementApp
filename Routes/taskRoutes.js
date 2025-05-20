const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middlewares/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../Controllers/taskController');

// Apply authMiddleware only here, so tasks routes require auth
//router.use(authMiddleware);

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
