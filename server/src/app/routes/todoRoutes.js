const express = require('express');
const todoController = require('../controllers/todoController');
const authenticateUser = require("../../middleware/auth")

const router = express.Router();

router.post('/', authenticateUser, todoController.create);
router.get('/', authenticateUser, todoController.get);
router.put('/', authenticateUser, todoController.update);
router.delete('/', authenticateUser, todoController.delete);

module.exports = router;
