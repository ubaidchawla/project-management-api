const Workspace = require('../models/workspaces');
const validateRequest = require('../utils/validate-request');
const removeEmpty = require('../utils/remove_empty').removeEmpty;
const logger = require('../utils/logger');
const Joi = require('joi');

var fs = require('fs');
const path = require('path');
var __dirname = path.resolve();
const global_uploads_path_images = __dirname + '/uploads/workspaces/';

exports.create = async (req, res) => {
    try {
        const schema = Joi.object({
            name : Joi.string().required(), 
            description : Joi.string().required(), 
        });
        
        const validationError = validateRequest(schema, req.body);

        if (validationError) return res.status(400).send({error: "Bad Request", message: validationError});
    
        const workspace = new Workspace();
    
        workspace.name = req.body.name,
        workspace.description = req.body.description
        workspace.image = req.file.filename,

        await workspace.save();
        res.status(200).send({status:1, data:workspace})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error.", error:error});
    }
};

exports.find = async (req, res) => 
{
    try {
        const response = await Workspace.findById(req.params.id)
        res.send(response)

    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.findAll = async (req, res) => 
{
    try {
        const response = await Workspace.find()
        res.send(response)
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.update = async (req, res) => {
    try {

        let new_image,Updated_Workspace;
        if(req.file)
        {
            Workspace.findById(req.params.id)
            .then((workspaces) => {
                    fs.unlink(global_uploads_path_images+workspaces.image, async (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                        //file removed
                      })
            })
            new_image = req.file.filename;
            Updated_Workspace = {
                name:req.body.name,
                description:req.body.description,
                image:new_image
            }
            
        }
        else {
            Updated_Workspace = {
                name:req.body.name,
                description:req.body.description
            }
        }

        const response = await Workspace.findByIdAndUpdate(req.params.id, Updated_Workspace, {new: true});

        res.status(200).send({status:1,message:"Updated Successfully",data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};

exports.delete = async (req, res) => 
{
    try {
        const workspace = await Workspace.findById(req.params.id)
        let response;
        fs.unlink(global_uploads_path_images+workspace.image, async (err) => {
            if (err) {
              console.error(err)
              return
            }
            response = await Workspace.findByIdAndRemove(req.params.id)
            //file removed
          })
        
        res.status(200).send({status:1, message:"Deleted Successfully", data:response})
    } catch (error) {
        // logger.error(error)
        res.status(500).send({ message: "Internal server error." });
    }
};
