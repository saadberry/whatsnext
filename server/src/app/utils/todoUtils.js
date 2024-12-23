/*
Utility methods related to todo logic
*/
const Todo = require("../models/todo")
const constants = require("../../constants");
const CustomError = require("../../errors");

// Get records by id
exports.getById = async (id) => {
    return await Todo.find({id: id})
}

// Get records by user id
exports.getByUserId = async (userId) => {
    // Return ACTIVE records by user
    return await Todo.find({userId: userId, isActive: true})
}

// Checks if record is active or not
exports.isRecordActive = async (id) => {
    is_active = await exports.getById(id)
    if (is_active) {
        return true
    } else {
        return false
    }
}

// Validate that user owns record
exports.checkOwnership = async (userId, recordId) => {
    // Get records by user
    const user_records = await exports.getByUserId(userId);
    // Check if recordId is present in user_records
    const does_exist = user_records.find(record => record._id == recordId) !== undefined;
    return does_exist
}

