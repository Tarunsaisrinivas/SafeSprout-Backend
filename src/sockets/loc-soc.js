const { model } = require("mongoose");
const models = require("../database/models");
const { emit } = require("nodemon");

function locationSocket(io, socket) {
  socket.on("locLive", (loc) => {
    console.log(loc);
  });
}

module.exports = locationSocket;
