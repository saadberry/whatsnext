/*
Schema for users
Users will contain the following fields:
    - name <string>
    - email <string>
    - password <string>
    - createdAt <datetime>
    - isActive <bool>
*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
        type: String,
        required: true,
      },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  });

const Users = mongoose.model('Users', userSchema);

module.exports = Users;