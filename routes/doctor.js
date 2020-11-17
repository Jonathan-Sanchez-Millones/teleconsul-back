'use strict'

var express = require('express');
var DoctorController = require('../controllers/doctor');
const {verifyTokenDoctor,verifyTokenPaciente}= require('../middlewares/authjwt');

var router = express.Router();

router.get('/home',DoctorController.home);
router.get('/pacientes/:doctorId',verifyTokenDoctor,DoctorController.getPacientesByDoctor);

module.exports = router;