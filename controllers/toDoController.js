const ToDo = require('../models/toDoModel');

// Function to get user's Tasks
const getUserToDos = async (req, res) => {
  try {
    const userId = req.user._id;

    const toDos = await ToDo.find({ user: userId });

    res.status(200).json({
      message: 'Tasks fetched successfully',
      toDos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch Tasks',
      error: error.message,
    });
  }
};

// Function to add a new Task
const addToDo = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // Assuming req.user.id contains the logged-in user's ID
    const userId = req.user.id;

    // Create a new Task
    const newToDo = new ToDo({
      title,
      description,
      date,
      user: userId,
    });

    // Log the new Task data to the terminal
    console.log('New Task:', newToDo);

    // Save the Task to the database
    const savedToDo = await newToDo.save();

    res.status(201).json({
      message: 'Task added successfully',
      toDo: savedToDo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add Task',
      error: error.message,
    });
  }
};

// Function to edit an existing Task
const editToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, date } = req.body;

    // Assuming req.user.id contains the logged-in user's ID
    const userId = req.user.id;

    // Find the Task by ID and user ID and update it
    const updatedToDo = await ToDo.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, status, date },
      { new: true, runValidators: true }
    );

    // Log the updated Task data to the terminal
    console.log('Updated Task:', updatedToDo);

    if (!updatedToDo) {
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    res.status(201).json({
      message: 'Task updated successfully',
      toDo: updatedToDo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update Task',
      error: error.message,
    });
  }
};

// Function to delete a Task
const deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming req.user.id contains the logged-in user's ID
    const userId = req.user.id;

    // Log request details
    console.log(`Attempting to delete Task with ID: ${id} for user ID: ${userId}`);

    // Find the Task by ID and user ID and delete it
    const deletedToDo = await ToDo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedToDo) {
      console.log(`Task with ID: ${id} not found`);
      return res.status(404).json({
        message: 'Task not found',
      });
    }

    console.log(`Task with ID: ${id} deleted successfully`);
    res.status(200).json({
      message: 'Task deleted successfully',
      toDo: deletedToDo,
    });
  } catch (error) {
    console.error('Error deleting Task:', error);
    res.status(500).json({
      message: 'Failed to delete Task',
      error: error.message,
    });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Read status from the request body

    // Validate status
    if (!['Completed', 'Pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Assuming req.user.id contains the logged-in user's ID
    const userId = req.user.id;

    // Find the Task by ID and user ID and update its status
    const updatedToDo = await ToDo.findOneAndUpdate(
      { _id: id, user: userId },
      { status },
      { new: true, runValidators: true }
    );

    console.log('Updated Task Status:', updatedToDo);

    if (!updatedToDo) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({
      message: 'Task status updated successfully',
      toDo: updatedToDo,
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      message: 'Failed to update Task status',
      error: error.message,
    });
  }
};

// Function to update Task status

module.exports = {
  addToDo,
  editToDo,
  getUserToDos,
  deleteToDo,
  updateStatus, // Export the updateStatus function
};
