/*
Utility methods related to user logic
*/
const bcrypt = require("bcrypt")
const constants = require("../../constants")

exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, constants.saltRounds)
}