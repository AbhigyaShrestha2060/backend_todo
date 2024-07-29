const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'pending',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const ToDo = mongoose.model('ToDo', toDoSchema);
module.exports = ToDo;
