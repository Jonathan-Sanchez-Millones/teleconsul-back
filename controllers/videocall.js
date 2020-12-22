"use strict";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
var faker = require("faker");

var controller = {
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
  },*/

  

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

   
  },
};

module.exports = controller;
