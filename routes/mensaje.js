'use strict'

var express = require('express');
var MensajeController = require('../controllers/mensaje');
const {verifyToken}= require('../middlewares/authjwt');
var router = express.Router();
const multer= require('../libs/multer')

router.post('/enviar-mensaje',verifyToken, multer.single('image'), MensajeController.saveImage);
router.get('/mensajes-recibidos/:page?',verifyToken,MensajeController.getMensajesRecibidos);
router.get('/mensajes-enviados/:page?',verifyToken,MensajeController.getMensajesEnviados);
router.get('/mensajes/:id',verifyToken,MensajeController.getMensajes);

module.exports = router;