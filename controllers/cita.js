"use strict";
const BackupCita = require("../models/backupcita");
const Cita = require("../models/cita");
const Encuesta = require("../models/encuesta");
const moment = require("moment");
var _ = require('underscore');

var controller = {
    
    saveCita: function (req, res) {
    
        const { paciente, fecha, razon} = req.body
        const doctorId = req.doctorId;

        var cita=new Cita();
        cita.doctor=doctorId;
        cita.paciente=paciente;
        cita.fecha=fecha;
        cita.razon=razon;
        cita.save();
        res.status(200).json(cita);
      },

      //Esto es para la vista del doctor
      getCitasDoctor: async function (req, res) {
        var doctorId = req.doctorId;;
        var citas = await Cita.find({ doctor: doctorId })
            .select({ doctor: 0 })
            .sort({"created_at":1})
        
        res.status(200).json(citas);

      },
      //Esto es para la vista del paciente
      getCitasPaciente: async function (req, res) {
        var pacienteId = req.pacienteId;;
        var citas = await Cita.find({ paciente: pacienteId })
            .select({ paciente: 0 })
            .sort({"created_at":1})
        
        res.status(200).json(citas);

            
      },

      deleteCita: async function (req, res) {
        
        var id=req.params.id;
        const cita = await Cita.find({_id:id})
        .lean().exec(function (err, result) {

          if(result){
              
              let backupcita = new BackupCita();
              backupcita.doctor = result.doctor;
              backupcita.paciente = result.paciente;
              backupcita.fecha = result.fecha;
              backupcita.razon = result.razon;

              backupcita.save();
              
          }else{
            console.log(err);
          }
      });
      
        await Cita.remove({_id:id});
        res.status(200).json({ok:true,});

      },

      updateCita: async function (req, res) {
        
        var id=req.params.id;
        var nueva_fecha=req.body.fecha; 

        await Cita.updateOne({_id:id}, {fecha:nueva_fecha});
        res.status(200).json({ok:true,});
  
      }
    
    
};


module.exports = controller;
