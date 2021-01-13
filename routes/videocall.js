'use strict'

var express = require('express');
var VideocallController = require('../controllers/videocall');
const {verifyToken,verifyTokenDoctor}= require('../middlewares/authjwt');
var router = express.Router();


//TWILIO
router.get('/video/token',VideocallController.getToken);
router.post('/video/createRoom',VideocallController.createRoom);
router.get('/video/getRooms',VideocallController.getRooms);
//router.get('/video/participantes',VideocallController.getParticipants);

//ZOOM
router.post('/video/token-zoom',VideocallController.getTokenZoom);
router.get('/video/oauthtoken-zoom',VideocallController.getOauthTokenZoom);


module.exports = router;