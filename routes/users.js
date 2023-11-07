const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const middleware = require('../middleware').checkToken;

// routes
router.post('/signup', userController.create);
router.post('/signin/', userController.login);
router.patch('/:id', middleware, userController.update);

module.exports = router;