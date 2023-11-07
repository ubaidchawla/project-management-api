const UserRole = require('../models/userRoles');
const validateRequest = require('../utils/validate-request');
// const removeEmpty = require('../utils/remove_empty').removeEmpty;
// const logger = require('../utils/logger');
const Joi = require('joi');

exports.create = async (req, res) => {
    try {
        const schema = Joi.object({
            name : Joi.string().required(), 
            description : Joi.string().required(), 
        });
        
        const validationError = validateRequest(schema, req.body);

        if (validationError) return res.status(400).send({error: "Bad Request", message: validationError});
    
        const userRole = new UserRole();
        userRole.name = req.body.name,
        userRole.description = req.body.description

        await userRole.save();
        res.status(200).send({status:1, data:userRole})
    } catch (error) {
        // // logger.error(error)
        res.status(500).send({ message: "Internal server error.", error: error.message });
    }
};

exports.find = async (req, res) => 
{
    try {
        const response = await UserRole.findById(req.params.id)
        res.send(response)

    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.findAll = async (req, res) => 
{
    try {
        const response = await UserRole.find()
        res.send(response)
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.update = async (req, res) => {
    try {
        const response = await UserRole.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            description:req.body.description
        }, {new: true});
        res.status(200).send({status:1,message:"Updated Successfully",data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.delete = async (req, res) => 
{
    try {
        const response = await UserRole.findByIdAndRemove(req.params.id)
        res.status(200).send({status:1, message:"Deleted Successfully", data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};
