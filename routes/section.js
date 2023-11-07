const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section');
const middleware = require('../middleware').checkToken;

// routes
router.post('/add/', middleware, sectionController.create);
router.get('/', middleware, sectionController.findAll);
router.get('/:id', middleware, sectionController.find);
router.patch('/update/:id', middleware, sectionController.update);
router.delete('/delete/:id', middleware, sectionController.delete);

module.exports = router;