var express = require('express');
var router = express.Router();

const UserController = require('../../app/controllers/user.controller')

router.post('/register', UserController.registerUser);

module.exports = router;
