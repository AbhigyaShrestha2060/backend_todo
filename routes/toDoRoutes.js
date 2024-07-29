const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/toDoController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to add a new to-do item
router.post('/todo/add', toDoController.addToDo);
router.post('/todo/edit/:id', toDoController.editToDo);
router.get('/todo/get', authMiddleware, toDoController.getUserToDos);
module.exports = router;
