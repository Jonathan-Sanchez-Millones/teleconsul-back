'use strict'

var express = require('express');
var EncuestaController = require('../controllers/encuesta');
const {verifyTokenPaciente}= require('../middlewares/authjwt');
var router = express.Router();

router.post('/enviar-encuesta',verifyTokenPaciente,EncuestaController.saveEncuesta);
//router.get('/mensajes/:id',verifyToken,MensajeController.getMensajes);

module.exports = router;