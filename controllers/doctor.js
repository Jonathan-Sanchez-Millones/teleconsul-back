'use strict'

const Doctor=require('../models/doctor');
const DoctorPaciente=require('../models/doctor_paciente');
const paciente = require('../models/paciente');

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
        const d_pacientes= await DoctorPaciente.find({'doctor':req.params.doctorId}).select({ "paciente": 1, "_id": 0})
        .populate('paciente',{"email":0,"password":0,"_id":0,"roles":0});
        res.status(200).json(d_pacientes);
    }
};

module.exports=controller;