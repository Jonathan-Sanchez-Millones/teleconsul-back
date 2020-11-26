'use strict'

var express = require('express');
var MensajeController = require('../controllers/mensaje');
const {verifyToken}= require('../middlewares/authjwt');

var router = express.Router();

router.post('/enviar-mensaje',verifyToken,MensajeController.saveMessage);
router.get('/mensajes-recibidos/:page?',verifyToken,MensajeController.getMensajesRecibidos);
router.get('/mensajes-enviados/:page?',verifyToken,MensajeController.getMensajesEnviados);
router.get('/mensajes/:id',verifyToken,MensajeController.getMensajes);

module.exports = router;