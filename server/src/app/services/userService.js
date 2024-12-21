/*
User related services
*/
const User = require("../models/users")

exports.create = async (name, email) => {
    console.log(`[in_service] email=${email}, name=${name}`)
    const new_user = new User({name, email})
    return await new_user.save();
}