const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/userRoles');
const middleware = require('../middleware').checkToken;

// routes
router.post('/add/', middleware, userRoleController.create);
router.get('/', middleware, userRoleController.findAll);
router.get('/:id', middleware, userRoleController.find);
router.patch('/update/:id', middleware, userRoleController.update);
router.delete('/delete/:id', middleware, userRoleController.delete);

module.exports = router;