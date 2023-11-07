const mongoose = require('mongoose');
var tasksSchema= mongoose.Schema(
{
    name:
    {
        type: String, 
        required: true
    },
    assignee:
    {
        type: String,
        default: null
    },
    duedate:
    {
        type: Date,
        default: null
    },
    description:
    {
        type: String,
        default: null
    }
},
{ 
    timestamps: true 
});
    
module.exports = mongoose.model('Task', tasksSchema, 'tasks');