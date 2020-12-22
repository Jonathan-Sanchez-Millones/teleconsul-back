const jwt=require('jsonwebtoken');
const config=require('../config');
const Doctor=require('../models/doctor');
const Paciente=require('../models/paciente');

const verifyTokenDoctor = async(req,res,next) =>{

    try {
        const token = req.headers["x-access-token"]

        console.log(token);

        if(!token) return res.status(403).json({message:"No hay token"});

        const decoded = jwt.verify(token,config.SECRET)

        req.doctorId=decoded.id;

        const doctor=await Doctor.findById(req.doctorId,{password:0});
        console.log(doctor);

        if(!doctor) return res.status(404).json({message:"No existe el usuario doctor"});

        else{
        next(); }       
    } catch (error) {
        return res.status(401).json({message:"Token invalido"});
    }
}

const verifyTokenPaciente = async(req,res,next) =>{

   try {
    const token = req.headers["x-access-token"]

    console.log(token);

    if(!token) return res.status(403).json({message:"No hay token"});

    const decoded = jwt.verify(token,config.SECRET)

    req.pacienteId=decoded.id;

    const paciente=await Paciente.findById(req.pacienteId,{password:0});
    console.log(paciente);
    
    if(!paciente) return res.status(404).json({message:"No existe el usuario paciente"});

    else{
    next();}
   } catch (error) {
    return res.status(401).json({message:"Token invalido"});
   }
}

const verifyToken = async(req,res,next) =>{

    try {
        const token = req.headers["x-access-token"]

        console.log(token);

        if(!token) return res.status(403).json({message:"No hay token"});

        const decoded = jwt.verify(token,config.SECRET)
        
        req.userId=decoded.id;

        req.rol=decoded.rol[0];

        const doctor=await Doctor.findById(req.userId,{password:0});

        if(!doctor) {
            
            const paciente=await Paciente.findById(req.userId,{password:0});
            console.log(paciente)
            if(!paciente) {
                return res.status(404).json({message:"No existe el usuario"});}
            else{
            next();}
        }
        else{
        next();}

    } catch (error) {
        return res.status(401).json({message:"Token invalido"});
    }
}

module.exports={verifyTokenDoctor,verifyTokenPaciente,verifyToken};