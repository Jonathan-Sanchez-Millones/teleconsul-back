'use strict'

var mongoose = require('mongoose');
var app= require('./app');
var port=3700;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://157.230.230.23/Hospital',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
        .then(()=>{

            console.log("Conexion a la bd hospital establecida exitosamente");

            //Creacion del servidor
            app.listen(port,()=>{

                console.log("Servidor corriendo en el puerto 3700");
            })
        })
        .catch(err=> console.log(err));