'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeSchema = Schema({

    doctor : {
        type: Schema.ObjectId,
        ref: 'Doctor'
     },
    paciente : {
        type: Schema.ObjectId,
        ref: 'Paciente'
     },
    dir: int,
    mensaje: String,
    viewed: String,
    created_at: String
});

module.exports = mongoose.model('Mensaje', MensajeSchema);