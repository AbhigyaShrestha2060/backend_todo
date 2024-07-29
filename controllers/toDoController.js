const ToDo = require('../models/toDoModel');

// Function to add a new to-do item
const addToDo = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    // Create a new to-do item
    const newToDo = new ToDo({
      title,
      description,
      user,
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
}; // Function to edit an existing to-do item
const editToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    // Find the to-do item by ID and update it
    const updatedToDo = await ToDo.findByIdAndUpdate(
      id,
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
};
