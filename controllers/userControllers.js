const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  // 1. Check incoming data
  console.log(req.body);

  // 2. DesStructure the incoming data
  const { fullName, phoneNumber, email, password } = req.body;

  // 3. Validate the data (if empty, stop the process and send response)
  if (!fullName || !phoneNumber || !email || !password) {
    // res.send("Please enter all fields");
    return res.status(400).json({
      success: false,
      message: 'Please enter all fields!',
    });
  }

  // 4. Error Handling(try catch)
  try {
    // 5. Check if the user is already registered
    const existingUser = await userModel.findOne({ email: email });

    if (existingUser) {
      return res.json({
        success: false,
        message: 'User Already Exists',
      });
    }

    // Hash the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // 5.2 if user is new
    const newUser = new userModel({
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      password: hashedPassword,
    });
    // Save to database
    await newUser.save();

    // Send the response
    res.status(201).json({
      success: true,
      message: 'User Created Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const loginUser = async (req, res) => {
  // 1. Check incoming data
  console.log(req.body);

  // 2. DesStructure the incoming data
  const { email, password } = req.body;

  // 3. Validate the data (if empty, stop the process and send response)
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please enter all fields!',
    });
  }
  try {
    // 4. Check if the user is already registered
    const user = await userModel.findOne({ email: email });
    // found data: fullName, phoneNumber, email, password

    // 4.1 if user not found: Send response
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      });
    }
    // 4.2 if user found
    // 5. Check if the password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);
    // 5.1 if password is wrong: Send response
    if (!passwordCorrect) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password',
      });
    }

    // 5.2 if password is correct
    // Token (generate -user data and key)
    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    // Send the response (token, user data)
    res.status(201).json({
      success: true,
      message: 'User logged in successfully',
      token: token,
      user: {
        id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// Exporting
module.exports = {
  createUser,
  loginUser,
};
