'use strict'

var express = require('express');
var CitaController = require('../controllers/cita');
const {verifyTokenPaciente,verifyTokenDoctor}= require('../middlewares/authjwt');
var router = express.Router();

router.post('/enviar-cita',verifyTokenDoctor,CitaController.saveCita);
router.get('/citas-doctor',verifyTokenDoctor,CitaController.getCitasDoctor);
router.get('/citas-paciente',verifyTokenPaciente,CitaController.getCitasPaciente);
router.get('/borrar-cita/:id',CitaController.deleteCita);
router.post('/actualizar-cita/:id',CitaController.updateCita);

module.exports = router;