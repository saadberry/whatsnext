/*
User related validators 
*/
const Users = require('../models/users')

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