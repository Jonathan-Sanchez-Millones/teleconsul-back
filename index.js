"use strict";

const jwt = require("jsonwebtoken");

require("dotenv").config();
var MensajeController = require("C:/Users/paulf/Documents/Projects/Backend-Teleconsulta/controllers/mensaje");
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
  socket.on("sendMessage", (message) => {
    // grabar en bd

    const newMessage = MensajeController.saveMessage(message, rol, id);
    console.log("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
