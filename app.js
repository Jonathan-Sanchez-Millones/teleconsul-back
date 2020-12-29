'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var cors=require('cors');
var app = express();
var path = require('path');

//cargar archivos de rutas
var doctor_routes = require('./routes/doctor');
var user_routes = require('./routes/user');
var mensaje_routes = require('./routes/mensaje');
var videocall_routes = require('./routes/videocall');
var paciente_routes = require('./routes/paciente');
var encuesta_routes = require('./routes/encuesta');
var epicrisi_routes = require('./routes/epicrisi');
var medication_routes = require('./routes/medication');

//middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser('secreto'));
app.use(session({

    secret:'secreto',
    resave:true,
    saveUninitialized:true
}));
app.use(cors());



//CORS


//rutas
app.use('/api',user_routes);
app.use('/api',doctor_routes);
app.use('/api',mensaje_routes);
app.use('/api',encuesta_routes);
app.use('/api',epicrisi_routes);
app.use('/api',medication_routes);
app.use('/api',videocall_routes);
app.use('/api',paciente_routes);
app.use('/uploads',express.static(path.resolve('uploads')));

//exportar
module.exports=app;