'use strict'

const DoctorPaciente=require('../models/doctor_paciente');
var _ = require('underscore');
const jwt=require('jsonwebtoken');
const config=require('../config');
const Encuesta = require("../models/encuesta");
const moment = require("moment");

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
    getPacientesByDoctor: async function(req,res){

        //const token = req.headers["x-access-token"];
        //const decoded = jwt.verify(token,config.SECRET)
        //var id_doctor_logeado=decoded.id;
        //console.log("mira1:"+id_doctor_logeado);
        var id_doctor_a_buscar=req.params.doctorId;
        //console.log("mira2:"+id_doctor_a_buscar);
        //if(id_doctor_logeado==id_doctor_a_buscar){

        const result= await DoctorPaciente.find({'doctor':id_doctor_a_buscar})
        .select({ "paciente": 1, "_id": 0})
        .populate('paciente',{"email":0,"password":0,"roles":0})
        .lean().exec();

        if(result){

            var pacientes = await Promise.all (result.map(async function(p) {
            p._id=p.paciente._id;
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
            console.log("id : " + p._id)
            
            var ultima_encuesta = await Encuesta.find({ paciente: p._id }).
            select({"paciente":0,"temperatura":0,"glucosa":0,"frecuencia_arterial":0,"frecuencia_respiratoria":0,
            "presion_arterial_diastolica":0,"presion_arterial_sistolica":0,"dolor":0,"sangrado_vagina":0,"color_sangrado_vagina":0,
            "sangrado_herida":0,"color_sangrado_herida":0,"coloracion_herida":0,"color_coloracion_herida":0,"molestia_miccion":0,
            "tipo_molestia_miccion":0,"veces_defeca_dia":0,"textura_heces":0,"otros":0}).sort({ "created_at": -1 }).limit(1).
            exec(); 
            console.log(ultima_encuesta);

           if(ultima_encuesta.length>0){

           p.ue=ultima_encuesta[0].estado;
            p.ur=ultima_encuesta[0].recomendacion;
           }
           else{
               p.ue="no tiene estado"
               p.ur="no tiene recom"
           }

            return p;           


            
        }))
        res.status(200).json(pacientes);

    } 

                       

        //}

        //else{
          //  res.status(403).json({message:"Solo puedes ver tus pacientes"});
        //}
    }
};

module.exports=controller;