const Project = require('../models/projects');
const validateRequest = require('../utils/validate-request');
// const removeEmpty = require('../utils/remove_empty').removeEmpty;
// const logger = require('../utils/logger');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

var fs = require('fs');
const path = require('path');
var __dirname = path.resolve();
const global_uploads_path_images = __dirname + '/uploads/projects/';

exports.create = async (req, res) => {
    try {
        const schema = Joi.object({
            name : Joi.string().required(), 
            description : Joi.string().required(),
            workspace : Joi.objectId()
        });
        
        const validationError = validateRequest(schema, req.body);

        if (validationError) return res.status(400).send({error: "Bad Request", message: validationError});
    
        const project = new Project();
        project.name = req.body.name,
        project.description = req.body.description,
        project.workspace = req.body.workspace,
        project.image = req.file.path

        await project.save();
        res.status(200).send({status:1, data:project})
    } catch (error) {
        // // logger.error(error)
        res.status(500).send({ message: "Internal server error.", error: error.message });
    }
};

exports.find = async (req, res) => 
{
    try {
        const response = await Project.findById(req.params.id)
        res.send(response)

    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.findAll = async (req, res) => 
{
    try {
        const response = await Project.find()
        res.send(response)
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.update = async (req, res) => {
    try {

        let new_image,Updated_Project;
        if(req.file)
        {
            Project.findById(req.params.id)
            .then((projects) => {
                    fs.unlink(global_uploads_path_images+projects.image, async (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                        //file removed
                      })
            })
            new_image = req.file.filename;
            Updated_Project = {
                name:req.body.name,
                description:req.body.description,
                workspace:req.body.workspace,
                image:new_image
            }
            
        }
        else {
            Updated_Project = {
                name:req.body.name,
                description:req.body.description,
                workspace:req.body.workspace
            }
        }

        const response = await Project.findByIdAndUpdate(req.params.id, Updated_Project, {new: true});

        res.status(200).send({status:1,message:"Updated Successfully",data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.delete = async (req, res) => 
{
    try {
        const project = await Project.findById(req.params.id)
        let response;
        fs.unlink(global_uploads_path_images+project.image, async (err) => {
            if (err) {
              console.error(err)
              return
            }
            response = await Project.findByIdAndRemove(req.params.id)
            //file removed
          })
        
        res.status(200).send({status:1, message:"Deleted Successfully", data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};