'use strict'

const Doctor=require('../models/doctor');
const Paciente=require('../models/paciente');
const config=require('../config');
const jwt=require('jsonwebtoken');

var controller = {

    login: async function (req,res){
        
        const{email,password}=req.body;
        console.log(email,password);
        const doctor= await Doctor.findOne({email,password})
        if(!doctor){

            const paciente= await Paciente.findOne({email,password})

            if(!paciente) return res.status(401).send("Usuario no existente");

            //return res.status(200).send("Bienvenido paciente");

            const token = jwt.sign({id:paciente._id,rol:paciente.roles},config.SECRET,{
                expiresIn:86400
            })
            global.userIdglobal=paciente._id;
            global.rolglobal=paciente.roles[0];
            res.json({token})            
        }
        else{
        //return res.status(200).send("Bienvenido doctor");
        const token = jwt.sign({id:doctor._id,rol:doctor.roles},config.SECRET,{
            expiresIn:86400
        })
        global.userIdglobal=doctor._id;
        global.rolglobal=doctor.roles[0];
        res.json({token})
        }
    },

    getUserByToken: async function(req,res){
        
        const token=req.headers["x-access-token"];
        console.log(token);
        const decoded = jwt.verify(token,config.SECRET)
        
        req.Id=decoded.id
        const rol=decoded.rol[0];
        req.roll=rol;
        

        if(rol=="doctor"){
            const doctor=await Doctor.findById(req.Id);
            res.status(200).json(doctor)
        }
        else{
            const paciente=await Paciente.findById(req.Id);
            res.status(200).json(paciente)
        }
        
        
    }
};

module.exports=controller;