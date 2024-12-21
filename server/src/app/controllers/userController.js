/*
Controller for Users related logic
*/
const userValidators = require("../validators/userValidators")
const userService = require("../services/userService")
const errors = require('../../errors')
const constants = require('../../constants')


exports.create = async (req, res) => {
    try {
        console.log(`req.body=${JSON.stringify(req.body)}`)
        const { name, email } = req.body;
        // Validate that user does not already exist
        does_exist = await userValidators.doesExist(email)
        console.log(`does_exist=${does_exist}`)
        if (does_exist) {
            return res.status(400).json({ error: errors.USER_ALREADY_EXISTS });
        }
        console.log(`saving user`)
        const result = await userService.create(name, email);
        res.status(201).json({ message: constants.USER_CREATED, result });
    } catch (e) {

    }
}