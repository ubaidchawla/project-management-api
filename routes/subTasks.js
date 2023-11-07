const express = require('express');
const router = express.Router();
const subTaskController = require('../controllers/subTasks');
const middleware = require('../middleware').checkToken;

// routes
router.post('/add/', middleware, subTaskController.create);
router.get('/', middleware, subTaskController.findAll);
router.get('/:id', middleware, subTaskController.find);
router.patch('/update/:id', middleware, subTaskController.update);
router.delete('/delete/:id', middleware, subTaskController.delete);

module.exports = router;