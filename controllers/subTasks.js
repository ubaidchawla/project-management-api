const SubTask = require('../models/subTasks');
const validateRequest = require('../utils/validate-request');
// const removeEmpty = require('../utils/remove_empty').removeEmpty;
// const logger = require('../utils/logger');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

exports.create = async (req, res) => {
    try {
        const schema = Joi.object({
            name : Joi.string().required(),
            duedate : Joi.date().required(),
            description : Joi.string().required(),
            task : Joi.objectId()
        });
        
        const validationError = validateRequest(schema, req.body);

        if (validationError) return res.status(400).send({error: "Bad Request", message: validationError});
    
        const subTask = new SubTask();
        subTask.name = req.body.name,
        subTask.duedate = req.body.duedate,
        subTask.task = req.body.task,
        subTask.description = req.body.description

        await subTask.save();
        res.status(200).send({status:1, data:subTask})
    } catch (error) {
        // // logger.error(error)
        res.status(500).send({ message: "Internal server error.", error: error.message });
    }
};

exports.find = async (req, res) => 
{
    try {
        const response = await SubTask.findById(req.params.id)
        res.send(response)

    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.findAll = async (req, res) => 
{
    try {
        const response = await SubTask.find()
        res.send(response)
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.update = async (req, res) => {
    try {
        const response = await SubTask.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            task:req.body.task,
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
        const response = await SubTask.findByIdAndRemove(req.params.id)
        res.status(200).send({status:1, message:"Deleted Successfully", data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};
