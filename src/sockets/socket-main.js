const locationSocket = require("./loc-soc");

const setupSocketIO = (io) => {
  socketIo = io;
  io.on("connection", (socket) => {
    locationSocket(io, socket);
    console.log("connected to socket");
  });
};

module.exports = {
  setupSocketIO,
};
