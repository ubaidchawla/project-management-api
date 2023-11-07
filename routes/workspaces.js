const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaces');
const multer  = require('multer')

const middleware = require('../middleware').checkToken;
const path = require('path');
var __dirname = path.resolve();
const global_uploads_path_images = __dirname + '/uploads/workspaces/';
const upload = multer({ dest: global_uploads_path_images })
// routes
router.post('/add/', middleware, upload.single('image'), workspaceController.create);
router.get('/', middleware, workspaceController.findAll);
router.get('/:id', middleware, workspaceController.find);
router.patch('/update/:id', middleware, upload.single('image'), workspaceController.update);
router.delete('/delete/:id', middleware, workspaceController.delete);

module.exports = router;

