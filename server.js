const express = require("express");
const app = express();
const port = process.env.PORT || 2020;


var projectRoutes = require('./routes/projects');
var sectionRoutes = require('./routes/section');
var subTaskRoutes = require('./routes/subTasks');
var taskRoutes = require('./routes/tasks');
var userRoleRoutes = require('./routes/userRoles');
var userRoutes = require('./routes/users');
var workspaceRoutes = require('./routes/workspaces')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Configuring the database
const dbConfig = require('./db.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
    }).then(() => {
    }).catch(err => {
      process.exit();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use('/projects',projectRoutes);
app.use('/sections',sectionRoutes);
app.use('/subtasks',subTaskRoutes);
app.use('/tasks',taskRoutes);
app.use('/userRoles',userRoleRoutes);
app.use('/users',userRoutes);
app.use('/workspaces',workspaceRoutes);


app.listen(port, () => {
  console.log("Server is Running")
});
