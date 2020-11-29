'use strict'

const DoctorPaciente=require('../models/doctor_paciente');
var _ = require('underscore');
const jwt=require('jsonwebtoken');
const config=require('../config');

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
    getDoctoresByPaciente:async function(req,res){

        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token,config.SECRET)
        var id_paciente_logeado=decoded.id;
        var id_paciente_a_buscar=req.params.pacienteId;

        if(id_paciente_logeado==id_paciente_a_buscar){

        const d_doctores= await DoctorPaciente.find({'paciente':id_paciente_a_buscar})
        .select({ "doctor": 1, "_id": 0})
        .populate('doctor',{"email":0,"password":0,"roles":0,"domicilio":0})
        .lean().exec(function (err, result) {

            if(result){
                var doctores = _.map(result, function(d) {
                    d._id=d.doctor._id
                    d.nombres = d.doctor.nombres;
                    d.apellidos = d.doctor.apellidos;               
                    d.fecha_nacimiento = d.doctor.fecha_nacimiento;               
                    d.dni = d.doctor.dni;               
                    d.telefono = d.doctor.telefono;               
                    d.especialidad = d.doctor.especialidad;               
                    d.foto = d.doctor.foto;            
            
                    d.doctor = undefined;
                    return d;
                });
                res.status(200).json(doctores);
            }
        });
        }

        else{
            res.status(403).json({message:"Solo puedes ver tus doctores"});
        }
    }
};

module.exports=controller;