const locationSocket = require("./loc-soc");

const setupSocketIO = (io) => {
  socketIo = io;
  io.on("connection", (socket) => {
    try {
      if (socket.handshake.query.isChild) locationSocket(io, socket);
      console.log("connected to socket");
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = {
  setupSocketIO,
};
