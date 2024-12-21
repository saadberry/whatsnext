/*
User related services
*/
const bcrypt = require("bcrypt")

const { saltRounds } = require("../../constants");
const User = require("../models/users")

exports.create = async (name, email, password) => {
    hashed_password = await bcrypt.hash(password, saltRounds)
    console.log(`hashed_password=${JSON.stringify(hashed_password)}`)
    const new_user = new User({name, email, password:hashed_password})
    return await new_user.save();
}

exports.login = async (email, password) => {
    const user = User.findOne({email: email, password: password})
    if (user) {
        return user
    } else {
        return null
    }
}