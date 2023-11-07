const User = require('../models/users');
const validateRequest = require('../utils/validate-request');
// const logger = require('../utils/logger');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
require('../models/userRoles');
const jwt = require('jsonwebtoken');

exports.create = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(), 
            username: Joi.string().required(),
            email : Joi.string().required(), 
            address : Joi.object().required(),  
            phone: Joi.string().required(), 
            website : Joi.string().allow(''),
            company : Joi.object().required(), 
            password : Joi.string().required(), 
            userRole : Joi.string().required()
        });
        
        const validationError = validateRequest(schema, req.body);

        if (validationError) return res.status(400).send({error: "Bad Request", message: validationError});

        const existUsername = await User.findOne({ username: req.body.username});
        const existEmail = await User.findOne({ email: req.body.email});


        if (existUsername) {
            throw req.body.username + ' is already taken';
        }
        if (existEmail) {
            throw req.body.email + ' is already taken';
        }

        // res.send(req.body);
        const user = new User();
        user.name = req.body.name,
        user.username = req.body.username,
        user.email = req.body.email,
        user.address = req.body.address,
        user.phone = req.body.phone,
        user.password = await bcrypt.hash(req.body.password, 10),
        user.userRole = req.body.userRole,
        user.company = req.body.company,
        user.website = req.body.website
        await user.save();
        
        const token = jwt.sign({userId: user.id}, '555e7c89e063d6a514433973078560c7');

        res.status(200).send({status:1, data:user, token: token})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error.", error: error});
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.query.username });
        if (!user || !(await bcrypt.compare(req.query.password, user.password)))
            res.send('Username or password is incorrect');
        
        const token = jwt.sign({userId: user.id}, '555e7c89e063d6a514433973078560c7');
        res.status(200).send({status:1, data:user, token: token})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error.", error: error });
    }
};

exports.update = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!(await bcrypt.compare(req.query.password, user.password)))
            throw 'Old password is incorrect';

        const response = await Service.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            password: await bcrypt.hash(req.body.password, 10),
            userRole: req.body.userRole,
            company: req.body.company,
            website: req.body.website
        }, {new: true});
        res.status(200).send({status:1,message:"Updated Successfully",data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};
exports.findById = async (req, res) => 
{
    try {
        const response = await Task.findById(req.params.id)
        res.send(response)

    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};