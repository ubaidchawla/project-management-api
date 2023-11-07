const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');
const multer  = require('multer')

const middleware = require('../middleware').checkToken;
const path = require('path');
var __dirname = path.resolve();
const global_uploads_path_images = __dirname + '/uploads/workspaces/';
const upload = multer({ dest: global_uploads_path_images })

// routes
router.post('/add/', middleware, upload.single('image'), projectController.create);
router.get('/', middleware, projectController.findAll);
router.get('/:id', middleware, projectController.find);
router.patch('/update/:id', middleware, upload.single('image'), projectController.update);
router.delete('/delete/:id', middleware, projectController.delete);

module.exports = router;