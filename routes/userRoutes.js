const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users/username/:username', userController.getUserByUsername);
router.get('/users/id/:id', userController.getUserById);

module.exports = router;