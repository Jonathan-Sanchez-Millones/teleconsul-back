'use strict'

const Doctor=require('../models/doctor');
const Paciente = require('../models/paciente');
const jwt=require('jsonwebtoken');
const config=require('../config');
const moment = require('moment');
const mongoosePaginate=require('mongoose-pagination');


var controller = {
    
    probando:async function(req,res){

       res.status(200).send({message:"hello"});
    }
};

module.exports=controller;