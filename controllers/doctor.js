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
    getPacientesByDoctor:async function(req,res){

        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token,config.SECRET)
        var id_doctor_logeado=decoded.id;
        console.log("mira1:"+id_doctor_logeado);
        var id_doctor_a_buscar=req.params.doctorId;
        console.log("mira2:"+id_doctor_a_buscar);

        if(id_doctor_logeado==id_doctor_a_buscar){

        const d_pacientes= await DoctorPaciente.find({'doctor':id_doctor_a_buscar})
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

        else{
            res.status(403).json({message:"Solo puedes ver tus pacientes"});
        }
    }
};

module.exports=controller;