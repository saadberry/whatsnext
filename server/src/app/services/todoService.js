/*
Services related to todo app CRUD methods
*/
const Todo = require('../models/todo');
const todoUtils = require("../utils/todoUtils.js")
const constants = require("../../constants");
const { idText } = require('typescript');
// const validateOwnership = require("../validators/todoValidators.ts")

exports.create = async (userId, title, description) => {
    const todo = new Todo({ userId, title, description });
    return await todo.save();
  };

exports.get = async (userId) => {
    return await todoUtils.getByUserId(userId)
}

exports.update = async ( userId, id, title, status, description ) => {
    has_access = await todoUtils.checkOwnership(userId, id);
    if (!has_access) return constants.UNAUTHORIZED;
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { title, status, description },
    );
    if (!todo) throw new Error('To-Do not found');
  };
  
  exports.archive = async (userId, id) => {
    has_access = await todoUtils.checkOwnership(userId, id);
    if (!has_access) return constants.UNAUTHORIZED;
    // Do nothing if record is already archived
    is_active = todoUtils.isRecordActive(id)
    if (!is_active) {
      return
    }
    const result = await Todo.findOneAndUpdate(
      { _id: id },
      { isActive: false },
    );
    if (!result) throw new Error('To-Do not found');
  };