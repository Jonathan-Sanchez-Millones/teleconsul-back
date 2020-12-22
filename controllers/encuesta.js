"use strict";

const Encuesta = require("../models/encuesta");
const jwt = require("jsonwebtoken");
const config = require("../config");
const moment = require("moment");
const mongoosePaginate = require("mongoose-pagination");

var controller = {
  saveEncuesta: function (req,res) {
    
    const { temperatura, glucosa, frec_art, frec_resp, pres_art_dias, pres_art_sist,
    dolor, sangrado_v, color_sangrado_v, sangrado_h, color_sangrado_h,
    coloracion_h,color_coloracion_h,molestia_miccion,tipo_molestia_miccion,
    veces_defeca_dia,textura_heces,otros} = req.body;
    
    const pacienteId = req.pacienteId;
    var encuesta = new Encuesta();

    encuesta.paciente = pacienteId;
    encuesta.temperatura = temperatura;
    encuesta.glucosa = glucosa;
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

    var p_temp;
    var p_fa;
    //analisis de datos
    //temperatura

    if(36<=temperatura<=37.2){
      p_temp=0;
    }
    else if(37.3<=temperatura<=37.9){
      p_temp=1;
    }
    else if(38<=temperatura<=38.7 || temperatura<=35.9){
      p_temp=2;
    }
    else if(38.8<=temperatura<=39.5){
      p_temp=3;
    }
    else{
      p_temp=4;
    }

    //frecuencia arterial

    if(51<=frec_art<=90){
      p_fa=0;
    }
    else if(91<=frec_art<=100){
      p_fa=1;
    }
    else if(101<=frec_art<=110 || frec_art<=50){
      p_fa=2;
    }
    else if(111<=frec_art<=120){
      p_fa=3;
    }
    else{
      p_fa=4;
    }

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
