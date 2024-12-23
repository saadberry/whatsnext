/*
Controller for Users related logic
*/
const userValidators = require("../validators/userValidators.ts")
const userService = require("../services/userService")
const errors = require('../../errors')
const constants = require('../../constants')


exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Validate that user does not already exist
        does_exist = await userValidators.doesExist(email)
        if (does_exist) {
            return res.status(400).json({ error: errors.USER_ALREADY_EXISTS });
        }
        // Saving user
        const result = await userService.create(name, email, password);
        res.status(201).json({ message: constants.USER_CREATED, result });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate that user already exists
        does_exist = await userValidators.doesExist(email)
        if (!does_exist) {
            return res.status(400).json({ error: errors.USER_DOES_NOT_EXIST });
        }
        const result = await userService.login(email, password)
        if (result) {
            res.status(200).send(result)
        } else {
            // Return "invalid credentials" error if match found
            res.status(400).send(constants.INVALID_CREDENTIALS)
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}