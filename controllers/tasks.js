const Task = require('../models/tasks');
const validateRequest = require('../utils/validate-request');
// const removeEmpty = require('../utils/remove_empty').removeEmpty;
// const logger = require('../utils/logger');
const Joi = require('joi');

exports.create = async (req, res) => {
    try {
        const schema = Joi.object({
            name : Joi.string().required(),
            assignee : Joi.string().required(),
            duedate : Joi.date().required(),
            description : Joi.string().required()
        });
        
        const validationError = validateRequest(schema, req.body);

        if (validationError) return res.status(400).send({error: "Bad Request", message: validationError});
    
        const task = new Task();
        task.name = req.body.name,
        task.assignee = req.body.assignee,
        task.duedate = req.body.duedate,
        task.description = req.body.description

        await task.save();
        res.status(200).send({status:1, data:task})
    } catch (error) {
        // // logger.error(error)
        res.status(500).send({ message: "Internal server error.", error: error.message });
    }
};

exports.find = async (req, res) => 
{
    try {
        const response = await Task.findById(req.params.id)
        res.send(response)

    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.findAll = async (req, res) => 
{
    try {
        const response = await Task.find()
        res.send(response)
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.update = async (req, res) => {
    try {
        const response = await Task.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            assignee:req.body.assignee,
            duedate:req.body.duedate,
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
        const response = await Task.findByIdAndRemove(req.params.id)
        res.status(200).send({status:1, message:"Deleted Successfully", data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};
