'use strict'

var mongoose = require('mongoose');
var app= require('./app');
var io = require('socket.io');
var port=3700;

const mensajes = [];

/*io.on('connection',(socket)=>{
    socket.on('send-message', (data)=>{
        mensajes.push(data)
        socket.emit('text-event',mensajes)
    })

})*/

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Cacarlsen:blackwin@cluster0.ocl5l.mongodb.net/Hospital',{
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