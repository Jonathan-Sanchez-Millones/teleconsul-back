'use strict'

const Doctor=require('../models/doctor');
const DoctorPaciente=require('../models/doctor_paciente');
const paciente = require('../models/paciente');
var _ = require('underscore');

var controller = {
    home: function(req,res){
        return res.status(200).send({

            message:'Soy la home'
        });
        
    },
    test: function(req,res){
        return res.status(200).send({

            message:'Soy test'
        });
        
    },
    getPacientesByDoctor:async function(req,res){
        const d_pacientes= await DoctorPaciente.find({'doctor':req.params.doctorId})
        .select({ "paciente": 1, "_id": 0})
        .populate('paciente',{"email":0,"password":0,"_id":0,"roles":0})
        .lean().exec(function (err, result) {

            if(result){
                var pacientes = _.map(result, function(p) {
                    p.nombres = p.paciente.nombres;
                    p.apellidos = p.paciente.apellidos;               
                    p.fecha_nacimiento = p.paciente.fecha_nacimiento;               
                    p.dni = p.paciente.dni;               
                    p.domicilio = p.paciente.domicilio;
                    p.telefono = p.paciente.telefono;               
                    p.provincia = p.paciente.provincia;
                    p.estado_civil = p.paciente.estado_civil;               
                    p.foto = p.paciente.foto;            
            
                    p.paciente = undefined;
                    return p;
                });
                res.status(200).json(pacientes);
            }
        });
        
    }
};

module.exports=controller;