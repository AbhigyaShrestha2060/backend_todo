const router = require('express').Router();
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
router.use(authMiddleware);

// Creating user registration route
router.post('/create', userController.createUser);

// Creating user login route
router.post('/login', userController.loginUser);

module.exports = router;
