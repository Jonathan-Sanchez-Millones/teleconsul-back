'use strict'

var express = require('express');
var EpicrisiController = require('../controllers/epicrisi');
const {verifyTokenPaciente,verifyTokenDoctor}= require('../middlewares/authjwt');
var router = express.Router();

router.get('/epicrisis-paciente/:id',EpicrisiController.getEpicrisi);

module.exports = router;