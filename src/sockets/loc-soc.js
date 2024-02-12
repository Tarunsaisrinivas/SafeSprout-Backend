const { model } = require("mongoose");
const models = require("../database/models");
const { emit } = require("nodemon");

function locationSocket(io, socket) {
  if (socket.handshake.query.isChild)
    setInterval(() => socket.emit("reqLoc"), 3000);

  socket.on("locLive", (loc) => {
    print(loc);
  });

  socket.on("usrEmail", (email) => {
    print(email);
  });
}

module.exports = locationSocket;
