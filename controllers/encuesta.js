"use strict";

const Encuesta = require("../models/encuesta");
const jwt = require("jsonwebtoken");
const config = require("../config");
const moment = require("moment");
const mongoosePaginate = require("mongoose-pagination");

var controller = {
  saveEncuesta: function (req,res) {
    
    const { temperatura, frec_art, frec_resp, pres_art_dias, pres_art_sist,
    dolor, sangrado_v, color_sangrado_v, sangrado_h, color_sangrado_h,
    coloracion_h,color_coloracion_h,molestia_miccion,tipo_molestia_miccion,
    veces_defeca_dia,textura_heces,otros} = req.body;
    
    const pacienteId = req.pacienteId;
    var encuesta = new Encuesta();

    encuesta.paciente = pacienteId;
    encuesta.temperatura = temperatura;
    encuesta.frecuencia_arterial = frec_art;
    encuesta.frecuencia_respiratoria = frec_resp; 
    encuesta.presion_arterial_diastolica = pres_art_dias
    encuesta.presion_arterial_sistolica = pres_art_sist
    encuesta.dolor = dolor;
    encuesta.sangrado_vagina = sangrado_v
    encuesta.color_sangrado_vagina = color_sangrado_v
    encuesta.sangrado_herida = sangrado_h;
    encuesta.color_sangrado_herida = color_sangrado_h;
    encuesta.coloracion_herida = coloracion_h;
    encuesta.color_coloracion_herida = color_coloracion_h;
    encuesta.molestia_miccion = molestia_miccion;
    encuesta.tipo_molestia_miccion = tipo_molestia_miccion;
    encuesta.veces_defeca_dia = veces_defeca_dia;
    encuesta.textura_heces = textura_heces;
    encuesta.otros = otros;
    encuesta.created_at = moment().unix();
    encuesta.save()
    

    res.status(200).json(encuesta);
    


},
    getEncuestas: async function (req, res) {
    var pacienteId = req.params.id;
    var encuestas = await Encuesta.find({ paciente: pacienteId })
        .select({ paciente: 0 })
        .sort("created_at");
    
    return res.status(200).json(encuestas);
  },
};

module.exports = controller;
