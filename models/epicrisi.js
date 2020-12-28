'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EpicrisiSchema = Schema({

    paciente : {
        type: Schema.ObjectId,
        ref: 'Paciente'
     },
    fecha_procedimiento: String,
    fecha_alta: String,
    presion_arterial_sistolica: Number,
    presion_arterial_diastolica: Number,
    temperatura: Number,
    frecuencia_arterial: Number,
    frecuencia_respiratoria: Number,
    diagnostico_ingreso: String,
    diagnostico_egreso: String,

});

module.exports = mongoose.model('Epicrisi', EpicrisiSchema);