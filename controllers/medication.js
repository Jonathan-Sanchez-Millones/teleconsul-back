"use strict";

const Medication = require("../models/medication");
const Encuesta = require("../models/encuesta");
const moment = require("moment");
var _ = require('underscore');

var controller = {
    
      saveMedication: function (req, res) {
    
        const { encuesta, medicamentos, indicaciones} = req.body

        var medication=new Medication();
        medication.encuesta=encuesta;
        medication.medicamentos=medicamentos;
        medication.indicaciones=indicaciones;
        medication.save();
        res.status(200).json(medication);
      },

      //Esto es para la vista del doctor
      getMedication: async function (req, res) {
        var encuestaId = req.params.id;
        var medication = await Medication.find({ encuesta: encuestaId })
        .select({ encuesta: 0})
        res.status(200).json(medication);

      },
      //Esto es para la vista del paciente
      getEncuestas: async function (req, res) {
        var pacienteId = req.pacienteId;;
        var encuestas = await Encuesta.find({ paciente: pacienteId })
            .select({ paciente: 0, estado: 0 })
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
      }

      //Para ver los medicamentos en la vista de un paciente reusar el metodo getMedicantion

    
    
};


module.exports = controller;
