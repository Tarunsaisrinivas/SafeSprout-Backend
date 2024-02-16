const locationSocket = require("./loc-soc");
const parentSocket = require("../sockets/parent-soc");

const { updateLoc, addKey, getKeys, getMap } = require("../utilities/childMap");

const setupSocketIO = (io) => {
  socketIo = io;
  io.on("connection", (socket) => {
    try {
      if (socket.handshake.query.isChild) {
        addKey(socket.id, socket.handshake.query.childId);
        updateLoc(socket.handshake.query.childId, null);
        locationSocket(io, socket);
      } else parentSocket(io, socket);
      console.log("connected to socket");
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  setupSocketIO,
};
