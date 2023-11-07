const mongoose = require('mongoose');
var workspacesSchema= mongoose.Schema(
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
    }
},
{ 
    timestamps: true 
});
    
module.exports = mongoose.model('Workspace', workspacesSchema, 'workspaces');