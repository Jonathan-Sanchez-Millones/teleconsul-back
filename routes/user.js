'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.post('/login',UserController.login);
router.get('/self',UserController.getUserByToken);

module.exports = router;