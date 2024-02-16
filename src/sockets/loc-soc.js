const { model } = require("mongoose");
const models = require("../database/models");
const { emit } = require("nodemon");

const { updateLastLocation } = require("../functions/locations");

function locationSocket(io, socket) {
  socket.on("locLive", (loc) => {
    const location = { lat: loc.latitude, lon: loc.longitude };
    updateLastLocation(location, socket.handshake.query.childId);
  });
}

module.exports = locationSocket;
