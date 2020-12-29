'use strict'

var express = require('express');
var MedicationController = require('../controllers/medication');
const {verifyTokenPaciente,verifyTokenDoctor}= require('../middlewares/authjwt');
var router = express.Router();

router.post('/enviar-medication',MedicationController.saveMedication);
router.get('/medication-encuesta/:id',MedicationController.getMedication);
router.get('/triajes',verifyTokenPaciente,MedicationController.getEncuestas);

module.exports = router;