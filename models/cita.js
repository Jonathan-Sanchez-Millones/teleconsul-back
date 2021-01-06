'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitaSchema = Schema({

    doctor : {
        type: Schema.ObjectId,
        ref: 'Doctor'
     },
    paciente : {
        type: Schema.ObjectId,
        ref: 'Paciente'
     },
    fecha: Date,
    razon: String,


});

module.exports = mongoose.model('Cita', CitaSchema);