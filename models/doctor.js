'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DoctorSchema = Schema({

    nombres : String,
    apellidos : String,
    fecha_nacimiento : String,
    sexo : String,
    dni : Number,
    domicilio : String,
    telefono : Number,
    especialidad : String,
    email : String,
    password : String,
    foto: String,
    roles:[String]
});

module.exports = mongoose.model('Doctor', DoctorSchema);