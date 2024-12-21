/*
User related services
*/
const { constants } = require("../../constants");
const User = require("../models/users")

exports.create = async (name, email, password) => {
    const new_user = new User({name, email, password})
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