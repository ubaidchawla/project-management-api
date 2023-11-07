const mongoose = require('mongoose');
var userRolessSchema= mongoose.Schema(
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
    }
},
{ 
    timestamps: true 
});
    
module.exports = mongoose.model('UserRole', userRolessSchema, 'userRoles');