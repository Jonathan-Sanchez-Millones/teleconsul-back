"use strict";

const Epicrisi = require("../models/epicrisi");
var _ = require('underscore');

var controller = {
    
    getEpicrisi: function (req, res) {
    var pacienteId = req.params.id;
    var epicrisi = Epicrisi.find({ paciente: pacienteId })
    .populate('paciente',{"nombres":0,"apellidos":0,"sexo":0,"dni":0,"telefono":0,"provincia":0,"estado_civil":0,"email":0,"password":0,"roles":0,"domicilio":0})
    .lean().exec(function (err, result) {

      if(result){
          var paciente = _.map(result, function(p) {
              p._id=p.paciente._id               
              p.fecha_nacimiento = p.paciente.fecha_nacimiento;                           
      
              p.paciente = undefined;
              var fecha_procedimiento = new Date(p.fecha_procedimiento); 
              var fecha_alta = new Date(p.fecha_alta); 
              var fecha_nacimiento= new Date(p.fecha_nacimiento);
              var fecha_actual = new Date(); 

              var tiempo_post_operado = fecha_actual.getTime() - fecha_procedimiento.getTime(); 
              var dias_post_operado = tiempo_post_operado / (1000 * 3600 * 24);
                            
              var tiempo_alta = fecha_actual.getTime() - fecha_alta.getTime(); 
              var dias_alta = tiempo_alta / (1000 * 3600 * 24);

              var tiempo_edad = fecha_actual.getTime() - fecha_nacimiento.getTime(); 
              var años_edad = tiempo_edad / (365 * 1000 * 3600 * 24);
              
              p.dias_post_operado=Math.trunc(dias_post_operado);
              p.dias_alta=Math.trunc(dias_alta);
              p.edad=Math.trunc(años_edad);
              return p;
          });
          res.status(200).json(paciente);
      }
  });
    
  }
};

module.exports = controller;
