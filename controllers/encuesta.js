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
    var p_glucosa;
    var p_fa;
    var p_fr;
    var p_pad;
    var p_pas;
    var p_dolor;
    var p_csv;
    var p_csh;
    var p_cch;
    var p_tmm;
    var p_vdd;
    var p_th;
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

    //glucosa

    if(70<=glucosa<=108){
      p_glucosa=0;
    }
    else if(109<=glucosa<=125){
      p_glucosa=1;
    }
    else if(126<=glucosa<=150){
      p_glucosa=2;
    }
    else if(151<=glucosa<=200 || glucosa>200){
      p_glucosa=3;
    }
    else{
      p_glucosa=4;
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

    //frecuencia respiratoria

    if(14<=frec_resp<=18){
      p_fr=0;
    }
    else if(19<=frec_resp<=20){
      p_fr=1;
    }
    else if(21<=frec_resp<=22 || frec_resp<=13){
      p_fr=2;
    }
    else if(23<=frec_resp<=24){
      p_fr=3;
    }
    else{
      p_fr=4;
    }

    //presion arterial diastolica

    if(60<=pres_art_dias<=80){
      p_pad=0;
    }
    else if(81<=pres_art_dias<=90){
      p_pad=1;
    }
    else if(91<=pres_art_dias<=105 || pres_art_dias<=59){
      p_pad=2;
    }
    else if(106<=pres_art_dias<=115){
      p_pad=3;
    }
    else if(116<=pres_art_dias<=125){
      p_pad=4;
    }
    else{
      p_pad=5;
    }

    //presion arterial sistolica

    if(80<=pres_art_sist<=120){
      p_pas=0;
    }
    else if(121<=pres_art_sist<=140){
      p_pas=1;
    }
    else if(141<=pres_art_sist<=160 || pres_art_sist<=79){
      p_pas=2;
    }
    else if(161<=pres_art_sist<=180){
      p_pas=3;
    }
    else if(181<=pres_art_sist<=200){
      p_pas=4;
    }
    else{
      p_pas=5;
    }

    //dolor
    if(dolor=0){
      p_dolor=0;
    }
    else if(1<=dolor<=2){
      p_dolor=1;
    }
    else if(3<=dolor<=4){
      p_dolor=2;
    }
    else if(5<=dolor<=7){
      p_dolor=3;
    }
    else{
      p_dolor=4;
    }
    //color sangrado vagina
  if(sangrado_v=='Si'){

    switch (color_sangrado_v.toLowerCase()) {
    case 'amarillo transparente':
    p_csv=1;
    break;
    case 'rojo claro':
    p_csv=2;
    break;
    case 'rojo oscuro':
    p_csv=3;
    break;
    case 'verde':
    p_csv=4;
    break;
    default:
    p_csv=5;
    }
    }
  
    //color sangrado herida
  if(sangrado_h=='Si'){

    switch (color_sangrado_h.toLowerCase()) {
    case 'aceitoso':
    p_csh=1;
    break;
    case 'rojo claro':
    p_csh=2;
    break;
    case 'rojo oscuro':
    p_csh=3;
    break;
    case 'purulento':
    p_csh=4;
    break;
    case 'verde':
    p_csh=5;
    break;
    default:
    p_csh=6;
    }
    }

    //color coloracion herida
  if(coloracion_h=='Si'){

    switch (color_coloracion_h.toLowerCase()) {
    case 'morado':
    p_cch=1;
    break;
    case 'rojo':
    p_cch=2;
    break;
    default:
    p_cch=3;
    }
    }
  
    //tipo molestia miccion
  if(molestia_miccion=='Si'){

    p_tmm=tipo_molestia_miccion.length;
    }

  //veces defeca dia
  if(1<=veces_defeca_dia<=2){
    p_vdd=0;
  }
  else if(3<=dolor<=4){
    p_vdd=1;
  }
  else if(5<=dolor<=6){
    p_vdd=2;
  }
  else if(7<=dolor<=8){
    p_vdd=3;
  }
  else{
    p_vdd=4;
  }
  
  //textura de heces
  
    switch (textura_heces.toLowerCase()) {
    case 'cilindrica blanda':
    p_th=0;
    break;
    case 'pastosas':
    p_th=1;
    break;
    case 'liquidas':
    p_th=2;
    break;
    default:
    p_th=3;
    }
    
    var p_total = p_temp+p_glucosa+p_fa+p_fr+p_pad+p_pas+p_dolor+p_csv+p_csh+p_cch+p_tmm+p_vdd+p_th
    var estado;
    var recomendacion;
    //sacamos el estado del paciente según la encuesta

    if(0<=p_total<=12){
      estado='mejorado';
      recomendacion='seguir indicaciones medicas';
    }
    else if(13<=p_total<=25){
      estado='buen estado';
      recomendacions='seguir indicaciones medicas / llamada telefonica';
    }
    else if(26<=p_total<=38){
      estado='estacionario';
      recomendacion='videollamada para ampliar la anamnesis';
    }
    else{
      estado='mal estado'
      recomendacion='acudir a emergencias o videollamadas de emergencia';
    }
    encuesta.estado = estado;
    encuesta.recomendacion=recomendacion;
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
