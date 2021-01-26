"use strict";

//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
//const client = require("twilio")(accountSid, authToken);
//var faker = require("faker");
const crypto = require('crypto')
//const request = require('request')
const fetch = require('node-fetch')
const jwt=require('jsonwebtoken');

var controller = {

/*API TWILIO

  getToken: function (req, res) {
    const AccessToken = require("twilio").jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;
    var identity = faker.name.findName();
    var token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      { identity: identity }
    );

    const grant = new VideoGrant();
    token.addGrant(grant);

    res.status(200).send({ token: token.toJwt() });
  },

  createRoom: function (req, res) {
    client.video.rooms
      .create({
        enableTurn: true,
        statusCallback: "http://example.org",
        type: "peer-to-peer",
        uniqueName: "DailyStandup19",
      })
      .then((room) => res.status(200).json(room));
  },

  /*getParticipants: function (idRoom) {
    var apiKeySid = process.env.TWILIO_API_KEY;
    var apiKeySecret = process.env.TWILIO_API_SECRET;
    var Twilio = require("twilio");
    let cont=0;
    var client = new Twilio(apiKeySid, apiKeySecret, {
      accountSid: accountSid,
    });
    
    client.video
      .rooms("pp")
      .participants.list({ status: "connected" })
      .then((participants) => {
        console.log(participants.length);
      });
  },

  

  getRooms: async function (req, res) {
    let salas = [];
    let id;
    let name;
    let maxParticipants;
    let participantCount;

    let rooms = await client.video.rooms
      .list({ status: "in-progress", limit: 20 })
      console.log(rooms);

      for(let r in rooms){
        id = rooms[r].sid;
        name = rooms[r].uniqueName;
        maxParticipants = rooms[r].maxParticipants;
        let participants=await client.video
          .rooms(rooms[r].sid)
          .participants.list({ status: "connected" })
        participantCount = participants.length;
        salas = [...salas, { id, name, maxParticipants, participantCount }];

      }
      
      console.log(salas);
      res.status(200).json(salas);

   
  }, */

  //API ZOOM

  getTokenZoom: function (req, res) {
    
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(process.env.API_KEY + req.body.meetingNumber + timestamp + req.body.role).toString('base64')
    const hash = crypto.createHmac('sha256', process.env.API_SECRET).update(msg).digest('base64')
    const signature = Buffer.from(`${process.env.API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`).toString('base64')

    res.json({
      signature: signature
    })

  },

  createRoomZoom: async function (req,res) {
    
    /*const ruta = await fetch(`https://zoom.us/oauth/authorize?response_type=code&
    client_id=${process.env.clientID}&redirect_uri=https://devnknown.github.io/telemedicine-front/meet`,
    {method:'GET',
    redirect: `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.clientID}&redirect_uri=https://devnknown.github.io/telemedicine-front/meet`})
    
   if (req.query.code){
    console.log("lo logré");
    console.log(req.query.code);
   }
   console.log("entre");
   res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.clientID + '&redirect_uri=https://devnknown.github.io/telemedicine-front/meet')
    */
   const payload = {
    iss: process.env.API_KEY,
    exp: ((new Date()).getTime() + 5000)
  };
  
  const token = jwt.sign(payload, process.env.API_SECRET);
  
   
    const {topic} = req.body;

    let todo = {

      topic:topic
    };

    const resp = await fetch('https://api.zoom.us/v2/users/jonathan.sanchez3@unmsm.edu.pe/meetings',{
      method:'POST',
      body:JSON.stringify(todo),
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`}
    })
    //console.log(resp);
    const respuesta=await resp.json();
    console.log(respuesta);

    res.status(200).json(respuesta);
  }

  }
  

  



module.exports = controller;
