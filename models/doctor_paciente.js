'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Doctor_PacienteSchema = Schema({

    doctor : {
        type: Schema.ObjectId,
        ref: 'Doctor'
     },
    paciente : {
        type: Schema.ObjectId,
        ref: 'Paciente'
     },
     citas:[Date]
});

module.exports = mongoose.model('Doctors_Paciente', Doctor_PacienteSchema);