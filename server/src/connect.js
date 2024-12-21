const mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI; 

async function connectToDatabase() {
    try {
        await mongoose.connect(`${MONGO_URI}`);
        console.log('Connected to MongoDB via Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB with Mongoose:', error);
    }
}

module.exports = connectToDatabase;

