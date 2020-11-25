'use strict'

var express = require('express');
var MensajeController = require('../controllers/mensaje');
const {verifyToken}= require('../middlewares/authjwt');

var router = express.Router();

router.get('/probando',verifyToken,MensajeController.probando);

module.exports = router;