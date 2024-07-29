const ToDo = require('../models/toDoModel');

const getUserToDos = async (req, res) => {
  try {
    const userId = req.user._id;

    const toDos = await ToDo.find({ user: userId });

    res.status(200).json({
      message: 'To-Do items fetched successfully',
      toDos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch To-Do items',
      error: error.message,
    });
  }
};
// Function to add a new to-do item
const addToDo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Assuming req.user.id contains the logged-in user's ID
    const userId = req.user.id;

    // Create a new to-do item
    const newToDo = new ToDo({
      title,
      description,
      user: userId,
    });

    // Log the new to-do item data to the terminal
    console.log('New To-Do Item:', newToDo);

    // Save the to-do item to the database
    const savedToDo = await newToDo.save();

    res.status(201).json({
      message: 'To-Do item added successfully',
      toDo: savedToDo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add To-Do item',
      error: error.message,
    });
  }
};

// Function to edit an existing to-do item
const editToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Assuming req.user.id contains the logged-in user's ID
    const userId = req.user.id;

    // Find the to-do item by ID and user ID and update it
    const updatedToDo = await ToDo.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description, status },
      { new: true, runValidators: true }
    );

    // Log the updated to-do item data to the terminal
    console.log('Updated To-Do Item:', updatedToDo);

    if (!updatedToDo) {
      return res.status(404).json({
        message: 'To-Do item not found',
      });
    }

    res.status(200).json({
      message: 'To-Do item updated successfully',
      toDo: updatedToDo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update To-Do item',
      error: error.message,
    });
  }
};

module.exports = {
  addToDo,
  editToDo,
  getUserToDos,
};
