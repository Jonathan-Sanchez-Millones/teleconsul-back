'use strict'

const Doctor=require('../models/doctor');
const Paciente = require('../models/paciente');
const Mensaje = require('../models/mensaje');
const jwt=require('jsonwebtoken');
const config=require('../config');
const moment = require('moment');
const mongoosePaginate=require('mongoose-pagination');


var controller = {
    
    saveMessage:async function(message){

        const{receiver,texto}=message;

        var mensaje = new Mensaje();
        var emisor=req.rol;
        var userId=req.userId;
    
        if(emisor=="doctor"){
            mensaje.doctor = userId; 
            mensaje.paciente=receiver;
            mensaje.dir=1;
            mensaje.texto=texto;
            mensaje.created_at=moment().unix();
            mensaje.save();
            //res.status(200).send({message:mensaje});
        }
        else{
            mensaje.paciente = userId;
            mensaje.doctor=receiver;
            mensaje.dir=0;
            mensaje.texto=texto;
            mensaje.created_at=moment().unix();
            mensaje.save();
            //res.status(200).send({message:mensaje});
        }

    
    },

    getMensajesRecibidos:async function(req,res){

        var userId=req.userId;
        var rol=req.rol;
        var page=1;

        if(req.params.page){
            page=req.params.page;
        }

        var itemsPerPage=4;

        if(rol=="doctor"){

            const mensajes = await Mensaje.find({doctor:userId,dir:0}).populate('paciente','_id nombres apellidos foto')
            .paginate(page,itemsPerPage,(err,messages,total)=>{
                if(!messages) return res.status(404).send({message:"No hay mensajes"});

                return res.status(200).send({
                    total:total,
                    pages: Math.ceil(total/itemsPerPage),
                    messages
                })
            });
            

        }else{

            const mensajes = await Mensaje.find({paciente:userId,dir:1}).populate('doctor','_id nombres apellidos foto')
            .paginate(page,itemsPerPage,(err,messages,total)=>{
                if(!messages) return res.status(404).send({message:"No hay mensajes"});

                return res.status(200).send({
                    total:total,
                    pages: Math.ceil(total/itemsPerPage),
                    messages
                })
            });
        }
    },

    getMensajesEnviados:async function(req,res){

        var userId=req.userId;
        var rol=req.rol;
        var page=1;

        if(req.params.page){
            page=req.params.page;
        }

        var itemsPerPage=4;

        if(rol=="doctor"){

            const mensajes = await Mensaje.find({doctor:userId,dir:1}).populate('paciente','_id nombres apellidos foto')
            .paginate(page,itemsPerPage,(err,messages,total)=>{
                if(!messages) return res.status(404).send({message:"No hay mensajes"});

                return res.status(200).send({
                    total:total,
                    pages: Math.ceil(total/itemsPerPage),
                    messages
                })
            });
            

        }else{

            const mensajes = await Mensaje.find({paciente:userId,dir:0}).populate('doctor','_id nombres apellidos foto')
            .paginate(page,itemsPerPage,(err,messages,total)=>{
                if(!messages) return res.status(404).send({message:"No hay mensajes"});

                return res.status(200).send({
                    total:total,
                    pages: Math.ceil(total/itemsPerPage),
                    messages
                })
            });
        }
    },

    getMensajes:async function(req,res){

        var id=req.params.id;
        var userId=req.userId;
        var rol=req.rol;
        var page=1;

        if(req.params.page){
            page=req.params.page;
        }

        var itemsPerPage=4;

        if(rol=="doctor"){

            const mensajes = await Mensaje.find({doctor:userId,paciente:id})
            .select({ "doctor": 0, "paciente": 0})
            .sort('created_at')
            .paginate(page,itemsPerPage,(err,messages,total)=>{
                if(!messages) return res.status(404).send({message:"No hay mensajes"});

                return res.status(200).send({
                    total:total,
                    pages: Math.ceil(total/itemsPerPage),
                    messages
                })
            });
            

        }else{

            const mensajes = await Mensaje.find({paciente:userId,doctor:id})
            .select({ "doctor": 0, "paciente": 0})
            .sort('created_at')
            .paginate(page,itemsPerPage,(err,messages,total)=>{
                if(!messages) return res.status(404).send({message:"No hay mensajes"});

                return res.status(200).send({
                    total:total,
                    pages: Math.ceil(total/itemsPerPage),
                    messages
                })
            });
        }
    }

   
};

module.exports=controller;