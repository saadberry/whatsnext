/*
User related services
*/
const bcrypt = require("bcrypt")

const { saltRounds } = require("../../constants");
const User = require("../models/users")
const userUtils = require("../utils/userUtils")
const userValidators = require("../validators/userValidators.ts")

exports.create = async (name, email, password) => {
    hashed_password = await userUtils.hashPassword(password)
    console.log(`hashed_password=${JSON.stringify(hashed_password)}`)
    const new_user = new User({name, email, password:hashed_password})
    return await new_user.save();
}

exports.login = async (email, password) => {
    // Get hashed password from DB
    const user = await User.findOne({email: email})
    // Compare passwords
    const is_valid_password = await userValidators.validatePassword(password, user["password"])
    if (is_valid_password) {
        return user
    } else {
        return null
    }
}