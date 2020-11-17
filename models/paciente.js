'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PacienteSchema = Schema({

    nombres : String,
    apellidos : String,
    fecha_nacimiento : String,
    sexo : String,
    dni : Number,
    domicilio : String,
    telefono : Number,
    provincia: String,
    estado_civil: String,
    email : String,
    password : String,
    foto: String,
    roles: [String]
});

module.exports = mongoose.model('Paciente', PacienteSchema);