'use strict'

var express = require('express');
var VideocallController = require('../controllers/videocall');
const {verifyToken,verifyTokenDoctor}= require('../middlewares/authjwt');
var router = express.Router();



router.get('/video/token',VideocallController.getToken);
router.post('/video/createRoom',VideocallController.createRoom);
router.get('/video/getRooms',VideocallController.getRooms);
//router.get('/video/participantes',VideocallController.getParticipants);

module.exports = router;