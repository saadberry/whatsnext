/*
Schema for todo lists
This collection will contain the following fields:
    - title <string>
    - user_id <int>
    - createdAt <datetime>
    - isActive <bool>
*/

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["in-progress", "completed"],
        default: "in-progress"
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

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;