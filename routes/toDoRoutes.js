const express = require('express');
const router = express.Router();
const toDoController = require('../controllers/toDoController');

// Route to add a new to-do item
router.post('/todo/add', toDoController.addToDo);
router.post('/todo/edit/:id', toDoController.editToDo);

module.exports = router;
