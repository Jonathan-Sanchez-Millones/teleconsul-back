'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MedicationSchema = Schema({

    encuesta : {
        type: Schema.ObjectId,
        ref: 'Encuesta'
    },
    medicamentos: String,
    indicaciones: String

});

module.exports = mongoose.model('Medication', MedicationSchema);