const mongoose = require('mongoose');
var subTasksSchema= mongoose.Schema(
{
    name:
    {
        type: String, 
        required: true
    },
    description:
    {
        type: String,
        default: null
    },
    duedate:
    {
        type: String,
        default: null
    },
    
    task:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    }
},
{ 
    timestamps: true 
});
    
module.exports = mongoose.model('SubTask', subTasksSchema, 'subTasks');