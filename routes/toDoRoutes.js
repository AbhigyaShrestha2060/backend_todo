const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/toDoController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to add a new to-do item
router.post('/todo/add', authMiddleware, toDoController.addToDo);
router.put('/todo/edit/:id', authMiddleware, toDoController.editToDo);
router.get('/todo/get', authMiddleware, toDoController.getUserToDos);
router.delete('/todo/delete/:id', authMiddleware, toDoController.deleteToDo);
router.put('/todo/status/:id', authMiddleware, toDoController.updateStatus);
module.exports = router;
