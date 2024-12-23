/*
User related validators 
*/
const Users = require('../models/users')
const bcrypt = require("bcrypt")

// Method that validates if a user exists or not
exports.doesExist = async (email) => {
    try {
        console.log(`[in_validator] email=${email}`)
        const user = await Users.findOne({ email: email }); 
        // const user = await Users.find()
        console.log(`user=>${user}`)
        return !!user; // Returns true if user exists, false otherwise
        } catch (error) {
            throw new Error('Database query failed'); 
    }
}

// Method that validates input types

// Method that validates user password == hashed password
exports.validatePassword = async (password, hashed_password) => {
    const match = await bcrypt.compare(password, hashed_password)
    if (match) {
        return true;
    } else {
        return false;
    }
}
