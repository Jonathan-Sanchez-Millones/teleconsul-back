'use strict'

var express = require('express');
var DoctorController = require('../controllers/doctor');
const {verifyTokenDoctor,verifyTokenPaciente,verifyToken}= require('../middlewares/authjwt');

var router = express.Router();

//router.get('/home',verifyToken,DoctorController.home);
router.get('/pacientes/:doctorId',verifyTokenDoctor,DoctorController.getPacientesByDoctor);

module.exports = router;