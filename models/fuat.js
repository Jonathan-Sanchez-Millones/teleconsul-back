'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FuatSchema = Schema({

    doctor : {
        type: Schema.ObjectId,
        ref: 'Doctor'
     },
    paciente : {
        type: Schema.ObjectId,
        ref: 'Paciente'
     },
    descripcion_caso : String,
    tratamiento_actual: String,
    motivo_teleconsulta: String,
    diagnostico: String,
    descripcion_diagnostico: String,
    tratamiento: String,
    recomendaciones: String
});

module.exports = mongoose.model('Fuat', FuatSchema);