/*
Controller related to todo app CRUD methods
*/
const todoService = require('../services/todoService');
const errors = require('../../errors')
const constants = require('../../constants')
const jwt = require('jsonwebtoken');



exports.create = async (req, res) => {
    try {
      const userId = req.user["userId"]
      const { title, description } = req.body;
      const todo = await todoService.create(userId, title, description);
      res.status(201).json({ message: 'Record created successfully', todo });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.get = async (req, res) => {
    try {
        const userId = req.user["userId"]
        const todos = await todoService.get(userId);
        if (todos) {
          res.status(200).json({ response: {todos} });
        } else {
          res.status(200).send(constants.NO_RECORDS_EXIST)
        }
    } catch (error) {
        res.status(400).json({error: errors.NOT_FOUND})
    }
}

exports.update = async (req, res) => {
    try {
      const userId = req.user["userId"]
      const { id, title, status, description } = req.body;
      const result = await todoService.update( userId, id, title, status, description);
      // Raise Exception if user does not own record
      if (result == constants.UNAUTHORIZED) { 
          res.status(constants.UNAUTHORIZED_CODE).json({ error: constants.UNAUTHORIZED_MSG });
      } else { 
          res.status(200).json({response: constants.UPDATE_SUCCESSFUL});
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  exports.delete = async (req, res) => {
    try {
      const userId = req.user["userId"]
      const { id } = req.body;
      result = await todoService.archive(userId, id);
      if (result == constants.UNAUTHORIZED) { 
        res.status(constants.UNAUTHORIZED_CODE).json({ error: constants.UNAUTHORIZED_MSG });
      } else {
        res.status(204).send(constants.DELETION_SUCCESSFUL);
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };