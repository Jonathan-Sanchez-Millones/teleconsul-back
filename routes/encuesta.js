'use strict'

var express = require('express');
var EncuestaController = require('../controllers/encuesta');
const {verifyTokenPaciente,verifyTokenDoctor}= require('../middlewares/authjwt');
var router = express.Router();

router.post('/enviar-encuesta',verifyTokenPaciente,EncuestaController.saveEncuesta);
router.get('/encuestas-paciente/:id',verifyTokenDoctor,EncuestaController.getEncuestas);
router.get('/pruebita',EncuestaController.pruebita);

module.exports = router;