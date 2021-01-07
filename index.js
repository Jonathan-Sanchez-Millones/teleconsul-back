"use strict";
var express = require('express');
const dotenv=require('dotenv').config();
const { v4: uuidv4 }=require('uuid');
var path = require('path');
const jwt = require("jsonwebtoken");
const fs = require('fs');
require("dotenv").config();
var MensajeController = require(path.resolve('.','controllers','mensaje'));
var mongoose = require("mongoose");
var app = require("./app");
var exp= express();
var server = require("http").Server(app);
var SocketIO = require("socket.io");
var io = SocketIO(server, {
  cors: {
    origins: "*",
  },
});
exp.set( 'port',process.env.PORT || 3700);
const mensajes = [];

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexion a la bd hospital establecida exitosamente");

    //Creacion del servidor
    server.listen(exp.get('port'), () => {
      console.log(`Servidor corriendo en el puerto ${exp.get('port')}`);
      
    });
  })
  .catch((err) => console.log(err));

io.use(function (socket, next) {
  if (socket.handshake.query && socket.handshake.query.jwt) {
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
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  const {rol, id} = socket.decoded;
  let tipo="";
  let ruta="";
  let ruta_image="";
  socket.on("sendMessage", (message) => {
    // grabar en la bd
    if(!message.image){
      tipo="texto";
      

    }else{
      tipo="imagen";

      const extension=message.image.substring("data:image/".length, message.image.indexOf(";base64"));
      ruta="uploads/"+uuidv4()+"."+extension;
      ruta_image = path.resolve('.',ruta);
      const data = message.image.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFile(
      ruta_image
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
    socket.emit("sendMessage", newMessage);
    socket.to(message.receiver).emit("sendMessage", newMessage);
  });
  socket.on("connectUser", (user) => {
    console.log("izi");
    console.log(user._id);
    socket.join(user._id);
  });

  socket.on("rooms-updated", (data) => {
    console.log(data);
    socket.emit("rooms-updated",data);
    socket.emit.broadcast("rooms-updated",data);

  });
  
});
