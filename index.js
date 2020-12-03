"use strict";

const { v4: uuidv4 }=require('uuid');
var path = require('path');
const jwt = require("jsonwebtoken");
const fs = require('fs');
require("dotenv").config();
var MensajeController = require("C:/Users/Jonathan/Desktop/2020/2020-I/Tesis-I/telemedicine-backend/controllers/mensaje");
var mongoose = require("mongoose");
var app = require("./app");
var server = require("http").Server(app);
var SocketIO = require("socket.io");
var io = SocketIO(server, {
  cors: {
    origins: "*",
  },
});
var port = 3700;
const mensajes = [];

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://Cacarlsen:blackwin@cluster0.ocl5l.mongodb.net/Hospital",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexion a la bd hospital establecida exitosamente");

    //Creacion del servidor
    server.listen(port, () => {
      console.log("Servidor corriendo en el puerto 3700");
      //var base = path.resolve('.',"uploads",uuidv4());
      //console.log("Gaaaa:"+base);
    });
  })
  .catch((err) => console.log(err));

io.use(function (socket, next) {
  console.log("lasmdlsadmlasmdslakmdskald");
  if (socket.handshake.query && socket.handshake.query.jwt) {
    console.log("entrooooo");
    jwt.verify(
      socket.handshake.query.jwt,
      'hospital-api',
      function (err, decoded) {
        if (err) return next(new Error("Authentication error"));
        socket.decoded = decoded;
        next();
      }
    );
  } else {
    console.log("no entrooo");
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  console.log("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  const {rol, id} = socket.decoded;
  let tipo="";
  let ruta="";
  socket.on("sendMessage", (message) => {
    // grabar en bd
    if(!message.image){
      tipo="texto";
      

    }else{
      tipo="imagen";

      const extension=message.image.substring("data:image/".length, message.image.indexOf(";base64"))
      ruta = path.resolve('.',"uploads",(uuidv4()+"."+extension))
      const data = message.image.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFile(
      ruta
      ,
      data,
      { encoding: "base64" },
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );

    }

    const newMessage = MensajeController.saveMessage(message, rol, id, tipo,ruta);
    
    console.log(newMessage);
    socket.emit("sendMessage", newMessage);
    socket.to(message.receiver).emit("sendMessage", newMessage);
  });
  socket.on("connectUser", (user) => {
    console.log("izi");
    console.log(user._id);
    socket.join(user._id);
  });
  
});
