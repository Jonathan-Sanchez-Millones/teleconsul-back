'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EncuestaSchema = Schema({

    paciente : {
        type: Schema.ObjectId,
        ref: 'Paciente'
     },
    temperatura: Number,
    glucosa: Number,
    frecuencia_arterial: Number,
    frecuencia_respiratoria: Number,
    presion_arterial_diastolica: Number,
    presion_arterial_sistolica: Number,
    dolor: Number,
    sangrado_vagina: String,
    color_sangrado_vagina: String,
    sangrado_herida: String,
    color_sangrado_herida: String,
    coloracion_herida: String,
    color_coloracion_herida: String,
    molestia_miccion: String,
    tipo_molestia_miccion: [String],
    veces_defeca_dia: Number,
    textura_heces: String,
    otros: String,
    estado: String,
    recomendacion: String,
    created_at: String,
    verde: Number,
    amarillo: Number,
    naranja: Number,
    rojo: Number

});

module.exports = mongoose.model('Encuesta', EncuestaSchema);