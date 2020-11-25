'use strict'

var express = require('express');
var PacienteController = require('../controllers/paciente');
const {verifyTokenPaciente}= require('../middlewares/authjwt');

var router = express.Router();

router.get('/doctores/:pacienteId',verifyTokenPaciente,PacienteController.getDoctoresByPaciente);

module.exports = router;