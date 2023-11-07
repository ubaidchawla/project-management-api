const mongoose = require('mongoose');
var usersSchema= mongoose.Schema(
{
    name:
    {
        type: String, 
        required: true
    },
    username:
    {
        type: String,
        default: null
    },
    email:
    {
        type: String, 
        required: true
    },
    address:
    {
        type: Object,
        required: true
    },
    phone:
    {
        type: String, 
        required: true
    },
    website:
    {
        type: String, 
        required: true
    },
    password:
    {
        type: String, 
        required: true
    },
    company:
    {
        type: Object,
        required: true
    },
    userRole:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true
    },
},
{ 
    timestamps: true 
});
    
module.exports = mongoose.model('User', usersSchema, 'users');