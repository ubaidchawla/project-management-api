const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks');
const middleware = require('../middleware').checkToken;

// routes
router.post('/add/', middleware, taskController.create);
router.get('/', middleware, taskController.findAll);
router.get('/:id', middleware, taskController.find);
router.patch('/update/:id', middleware, taskController.update);
router.delete('/delete/:id', middleware, taskController.delete);

module.exports = router;