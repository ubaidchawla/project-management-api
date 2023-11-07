const mongoose = require('mongoose');
var projectsSchema= mongoose.Schema(
{
    name:
    {
        type: String, 
        required: true
    },
    image:
    {
        type: String,
        default: null
    },
    description:
    {
        type: String,
        default: null
    },
    workspace:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    }
},
{ 
    timestamps: true 
});
    
module.exports = mongoose.model('Project', projectsSchema, 'projects');