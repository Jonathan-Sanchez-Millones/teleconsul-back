'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BackupCitaSchema = Schema({

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

module.exports = mongoose.model('BackupCita', BackupCitaSchema);