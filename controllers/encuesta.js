"use strict";

const Encuesta = require("../models/encuesta");
const jwt = require("jsonwebtoken");
const config = require("../config");
var _ = require('underscore');
const moment = require("moment");
const mongoosePaginate = require("mongoose-pagination");



var controller = {
  saveEncuesta: function (req,res) {
    
    const { temperatura, glucosa, frecuencia_arterial:frec_art, frecuencia_respiratoria:frec_resp,
       presion_arterial_diastolica:pres_art_dias, presion_arterial_sistolica:pres_art_sist,
    dolor, sangrado_vagina:sangrado_v, color_sangrado_vagina:color_sangrado_v, sangrado_herida:sangrado_h, 
    color_sangrado_herida:color_sangrado_h,coloracion_herida:coloracion_h,color_coloracion_herida:color_coloracion_h,
    molestia_miccion,tipo_molestia_miccion,veces_defeca_dia,textura_heces,otros} = req.body;
    
    const pacienteId = req.pacienteId;
    var encuesta = new Encuesta();

    encuesta.paciente = pacienteId;
    encuesta.temperatura = temperatura;
    encuesta.glucosa = glucosa;
    encuesta.frecuencia_arterial = frec_art;
    encuesta.frecuencia_respiratoria = frec_resp; 
    encuesta.presion_arterial_diastolica = pres_art_dias;
    encuesta.presion_arterial_sistolica = pres_art_sist;
    encuesta.dolor = dolor;
    encuesta.sangrado_vagina = sangrado_v;
    encuesta.color_sangrado_vagina = color_sangrado_v;
    encuesta.sangrado_herida = sangrado_h;
    encuesta.color_sangrado_herida = color_sangrado_h;
    encuesta.coloracion_herida = coloracion_h;
    encuesta.color_coloracion_herida = color_coloracion_h;
    encuesta.molestia_miccion = molestia_miccion;
    encuesta.tipo_molestia_miccion = tipo_molestia_miccion;
    encuesta.veces_defeca_dia = veces_defeca_dia;
    encuesta.textura_heces = textura_heces;
    encuesta.otros = otros;

    var p_temp=0;
    var p_glucosa=0;
    var p_fa=0;
    var p_fr=0;
    var p_pad=0;
    var p_pas=0;
    var p_dolor=0;
    var p_csv=0;
    var p_csh=0;
    var p_cch=0;
    var p_tmm=0;
    var p_vdd=0;
    var p_th=0;
    
    //Semaforo
    var rojo=0;
    var naranja=0;
    var amarillo=0;
    var verde=0;

    //semaforo al ver detalle de teletriajes

    let colorTemperatura='';
    let colorGlucosa='';
    let colorFrecuenciaArterial='';
    let colorFrecuenciaRespiratoria='';
    let colorPresionArterialDiastolica='';
    let colorPresionArterialSistolica='';
    let colorDolor='';
    let colorSangradoVagina='';
    let colorSangradoHerida='';
    let colorColoracionHerida='';
    let colorTipoMolestiaMiccion='';
    let colorVecesDefecaDia='';
    let colorTexturaHeces='';

    function analisis(){
    //analisis de datos
    //temperatura

    if(36<=temperatura && temperatura<=37.2){
      p_temp=0;
      verde+=1;
      colorTemperatura='verde';
    }
    else if(37.3<=temperatura && temperatura<=37.9){
      p_temp=1;
      amarillo+=1;
      colorTemperatura='amarillo';
    }
    else if(38<=temperatura && temperatura<=38.7 || temperatura<=35.9){
      p_temp=2;
      naranja+=1;
      colorTemperatura='naranja';
    }
    else if(38.8<=temperatura && temperatura<=39.5){
      p_temp=3;
      naranja+=1;
      colorTemperatura='naranja';
    }
    else{
      p_temp=4;
      rojo+=1;
      colorTemperatura='rojo';

    }

    //glucosa

    if(70<=glucosa && glucosa<=108){
      p_glucosa=0;
      verde+=1;
      colorGlucosa='verde';
    }
    else if(109<=glucosa && glucosa<=125){
      p_glucosa=1;
      amarillo+=1;
      colorGlucosa='amarillo';
    }
    else if(126<=glucosa && glucosa<=150){
      p_glucosa=2;
      naranja+=1;
      colorGlucosa='naranja';
    }
    else if(151<=glucosa && glucosa<=200 || glucosa<70){
      p_glucosa=3;
      rojo+=1;
      colorGlucosa='rojo';
    }
    else{
      p_glucosa=4;
      rojo+=1;
      colorGlucosa='rojo';
    }


    //frecuencia arterial

    if(51<=frec_art && frec_art<=90){
      p_fa=0;
      verde+=1;
      colorFrecuenciaArterial='verde';
    }
    else if(91<=frec_art && frec_art<=100){
      p_fa=1;
      amarillo+=1;
      colorFrecuenciaArterial='amarillo';
    }
    else if(101<=frec_art && frec_art<=110 || frec_art<=50){
      p_fa=2;
      naranja+=1;
      colorFrecuenciaArterial='naranja';
    }
    else if(111<=frec_art && frec_art<=120){
      p_fa=3;
      naranja+=1;
      colorFrecuenciaArterial='naranja';
    }
    else{
      p_fa=4;
      rojo+=1;
      colorFrecuenciaArterial='rojo';
    }

    //frecuencia respiratoria

    if(14<=frec_resp && frec_resp<=18){
      p_fr=0;
      verde+=1;
      colorFrecuenciaRespiratoria='verde';
    }
    else if(19<=frec_resp && frec_resp<=20){
      p_fr=1;
      amarillo+=1;
      colorFrecuenciaRespiratoria='amarillo';
    }
    else if(21<=frec_resp && frec_resp<=22 || frec_resp<=13){
      p_fr=2;
      rojo+=1;
      colorFrecuenciaRespiratoria='rojo';
    }
    else if(23<=frec_resp && frec_resp<=24){
      p_fr=3;
      rojo+=1;
      colorFrecuenciaRespiratoria='rojo';
    }
    else{
      p_fr=4;
      rojo+=1;
      colorFrecuenciaRespiratoria='rojo';
    }

    //presion arterial diastolica

    if(60<=pres_art_dias && pres_art_dias<=80){
      p_pad=0;
      verde+=1;
      colorPresionArterialDiastolica='verde';
    }
    else if(81<=pres_art_dias && pres_art_dias<=90){
      p_pad=1;
      amarillo+=1;
      colorPresionArterialDiastolica='amarillo';
    }
    else if(91<=pres_art_dias && pres_art_dias<=105 || pres_art_dias<=59){
      p_pad=2;
      naranja+=1;
      colorPresionArterialDiastolica='naranja';
    }
    else if(106<=pres_art_dias && pres_art_dias<=115){
      p_pad=3;
      naranja+=1;
      colorPresionArterialDiastolica='naranja';
    }
    else if(116<=pres_art_dias && pres_art_dias<=125){
      p_pad=4;
      rojo+=1;
      colorPresionArterialDiastolica='rojo';
    }
    else{
      p_pad=5;
      rojo+=1;
      colorPresionArterialDiastolica='rojo';
    }

    //presion arterial sistolica

    if(80<=pres_art_sist && pres_art_sist<=120){
      p_pas=0;
      verde+=1;
      colorPresionArterialSistolica='verde';
    }
    else if(121<=pres_art_sist && pres_art_sist<=140){
      p_pas=1;
      amarillo+=1;
      colorPresionArterialSistolica='amarillo';
    }
    else if(141<=pres_art_sist && pres_art_sist<=160 || pres_art_sist<=79){
      p_pas=2;
      naranja+=1;
      colorPresionArterialSistolica='naranja';
    }
    else if(161<=pres_art_sist && pres_art_sist<=180){
      p_pas=3;
      naranja+=1;
      colorPresionArterialSistolica='naranja';
    }
    else if(181<=pres_art_sist && pres_art_sist<=200){
      p_pas=4;
      rojo+=1;
      colorPresionArterialSistolica='rojo';
    }
    else{
      p_pas=5;
      rojo+=1;
      colorPresionArterialSistolica='rojo';
    }

    //dolor
    if(dolor==0){
      p_dolor=0;
      verde+=1;
      colorDolor='verde';

    }
    else if(1<=dolor && dolor<=2){
      p_dolor=1;
      verde+=1;
      colorDolor='verde';
    }
    else if(3<=dolor && dolor<=4){
      p_dolor=2;
      amarillo+=1;
      colorDolor='amarillo';
    }
    else if(5<=dolor && dolor<=7){
      p_dolor=3;
      naranja+=1;
      colorDolor='naranja';

    }
    else{
      p_dolor=4;
      rojo+=1;
      colorDolor='rojo';
    }
    //color sangrado vagina
  if(sangrado_v=='Si'){

    switch (color_sangrado_v.toLowerCase()) {
    case 'amarillo transparente':
    p_csv=1;
    amarillo+=1;
    colorSangradoVagina='amarillo';
    break;
    case 'rojo claro':
    p_csv=2;
    amarillo+=1;
    colorSangradoVagina='amarillo';
    break;
    case 'rojo oscuro':
    p_csv=3;
    naranja+=1;
    colorSangradoVagina='naranja';
    break;
    case 'verde mal oliente':
    p_csv=4;
    rojo+=1;
    colorSangradoVagina='rojo';
    break;
    default:
    p_csv=5;
    rojo+=1;
    colorSangradoVagina='rojo';
    }
    }else{

      verde+=1;
    }
  
    //color sangrado herida
  if(sangrado_h=='Si'){

    switch (color_sangrado_h.toLowerCase()) {
    case 'aceitoso (graso)':
    p_csh=1;
    amarillo+=1;
    colorSangradoHerida='amarillo';
    break;
    case 'rojo claro':
    p_csh=2;
    amarillo+=1;
    colorSangradoHerida='amarillo';
    break;
    case 'rojo oscuro':
    p_csh=3;
    naranja+=1;
    colorSangradoHerida='naranja';
    break;
    case 'purulento (pus)':
    p_csh=4;
    rojo+=1
    colorSangradoHerida='rojo';
    break;
    case 'verde mal oliente':
    p_csh=5;
    rojo+=1;
    colorSangradoHerida='rojo';
    break;
    default:
    p_csh=6;
    rojo+=1;
    colorSangradoHerida='rojo';
    }
    }else{

      verde+=1;
    }

    //color coloracion herida
  if(coloracion_h=='Si'){

    switch (color_coloracion_h.toLowerCase()) {
    case 'morado (ligero dolor a la palpacion)':
    p_cch=1;
    amarillo+=1;
    colorColoracionHerida='amarillo';
    break;
    case 'rojo (doloroso a la palpacion)':
    p_cch=2;
    naranja+=1;
    colorColoracionHerida='naranja';
    break;
    default:
    p_cch=3;
    rojo+=1;
    colorColoracionHerida='rojo';
    }
    }else{

      verde+=1;
    }
  
    //tipo molestia miccion
  if(molestia_miccion=='Si'){

    p_tmm=(tipo_molestia_miccion.length)*3;
    rojo+=1;
    colorTipoMolestiaMiccion='rojo';
    }else{

      verde+=1;
    }

  //veces defeca dia
  if(1<=veces_defeca_dia && veces_defeca_dia<=2){
    p_vdd=0;
    verde+=1;
    colorVecesDefecaDia='verde';
  }
  else if(3<=veces_defeca_dia && veces_defeca_dia<=4){
    p_vdd=1;
    amarillo+=1;
    colorVecesDefecaDia='amarillo';
  }
  else if(5<=veces_defeca_dia && veces_defeca_dia<=6){
    p_vdd=2;
    naranja+=1;
    colorVecesDefecaDia='naranja';
  }
  else if(7<=veces_defeca_dia && veces_defeca_dia<=8 || veces_defeca_dia<1){
    p_vdd=3;
    naranja+=1;
    colorVecesDefecaDia='naranja';
  }
  else{
    p_vdd=4;
    rojo+=1;
    colorVecesDefecaDia='rojo';
  }
  
  //textura de heces
  
    switch (textura_heces.toLowerCase()) {
    case 'normal (cilindrica blanda no dolorosa)':
    p_th=0;
    verde+=1;
    colorTexturaHeces='verde';
    break;
    case 'pastosas':
    p_th=1;
    amarillo+=1;
    colorTexturaHeces='amarillo';
    break;
    case 'liquidas':
    p_th=2;
    naranja+=1;
    colorTexturaHeces='naranja';
    break;
    default:
    p_th=3;
    rojo+=1;
    colorTexturaHeces='rojo';
    }
  }
  analisis();

    console.log("p_temp: "+p_temp);
    console.log("p_gluc: "+p_glucosa);
    console.log("p_fa: "+p_fa);
    console.log("p_fr: "+p_fr);
    console.log("p_pad: "+p_pad);
    console.log("p_pas: "+p_pas);
    console.log("p_dolor: "+p_dolor);
    console.log("p_csv: "+p_csv);
    console.log("p_csh: "+p_csh);
    console.log("p_cch: "+p_cch);
    console.log("p_tmm: "+p_tmm);
    console.log("p_vdd: "+p_vdd);
    console.log("p_th: "+p_th);

    

    var p_total = p_temp+p_glucosa+p_fa+p_fr+p_pad+p_pas+p_dolor+p_csv+p_csh+p_cch+p_tmm+p_vdd+p_th
    console.log("p_total: "+p_total);
    var estado;
    var recomendacion;
    //sacamos el estado del paciente según la encuesta

    if(0<=p_total && p_total<=15){
      estado='mejorado';
      recomendacion='seguir indicaciones medicas / verificar preguntas criticas';
    }
    else if(16<=p_total && p_total<=25){
      estado='regular estado';
      recomendacion='seguir indicaciones medicas / llamada telefonica';
    }
    else if(26<=p_total && p_total<=40){
      estado='regular a estacionario';
      recomendacion='videollamada para ampliar la anamnesis';
    }
    else{
      estado='mal estado'
      recomendacion='acudir a emergencias o videollamada de emergencia';
    }
    encuesta.estado = estado;
    encuesta.recomendacion=recomendacion;
    encuesta.verde=verde;
    encuesta.amarillo=amarillo;
    encuesta.naranja=naranja;
    encuesta.rojo=rojo;
    encuesta.colorTemperatura=colorTemperatura;
    encuesta.colorGlucosa=colorGlucosa;
    encuesta.colorFrecuenciaArterial=colorFrecuenciaArterial;
    encuesta.colorFrecuenciaRespiratoria=colorFrecuenciaRespiratoria;
    encuesta.colorPresionArterialDiastolica=colorPresionArterialDiastolica;
    encuesta.colorPresionArterialSistolica=colorPresionArterialSistolica;
    encuesta.colorDolor=colorDolor;
    encuesta.colorSangradoVagina=colorSangradoVagina;
    encuesta.colorSangradoHerida=colorSangradoHerida;
    encuesta.colorColoracionHerida=colorColoracionHerida;
    encuesta.colorTipoMolestiaMiccion=colorTipoMolestiaMiccion;
    encuesta.colorVecesDefecaDia=colorVecesDefecaDia;
    encuesta.colorTexturaHeces=colorTexturaHeces;
    encuesta.created_at = moment().unix();

    console.log(encuesta);
    encuesta.save();
    
    res.status(200).json(encuesta);
    


},
    getEncuestas: async function (req, res) {
    var pacienteId = req.params.id;
    var encuestas = await Encuesta.find({ paciente: pacienteId })
        .select({ paciente: 0 })
        .sort({"created_at":-1})
        .lean().exec(function (err, result) {

          if(result){
              var encuestas = _.map(result, function(e) {
                  e.created_at= moment.unix(e.created_at).format("DD/MM/YYYY");
                  return e;
              });
              res.status(200).json(encuestas);
          }
      });
  },

  pruebita: function (req, res) {
    var verde = 1; 
    var amarillo = 2; 
    var naranja = 4; 
    var rojo = 7; 
    
    return res.status(200).json({verde,amarillo,naranja,rojo});
  },
};

module.exports = controller;
