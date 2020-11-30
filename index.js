'use strict'

require('dotenv').config();
var MensajeController = require('C:/Users/Jonathan/Desktop/2020/2020-I/Tesis-I/Backend/controllers/mensaje');
var mongoose = require('mongoose');
var app= require('./app');
var server = require('http').Server(app);
var SocketIO = require('socket.io');
var io = SocketIO(server,{
    cors:{
        origins: '*',
    }
});
var port=3700;
const mensajes = [];

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
        .then(()=>{

            console.log("Conexion a la bd hospital establecida exitosamente");

            //Creacion del servidor
            server.listen(port,()=>{

                console.log("Servidor corriendo en el puerto 3700");
            })
        })
        .catch(err=> console.log(err));

        io.on("connection", (socket) => {
            socket.on("sendMessage", (message) => {
             
               // grabar en bd
                
                    MensajeController.saveMessage(message);
               
               

              socket.emit("sendMessage", message);
              socket.to(message.receiver).emit("sendMessage", message);
            });
            socket.on("connectUser", (user) => {
              console.log("izi");
              console.log(user._id);
              socket.join(user._id);
            });
          });

