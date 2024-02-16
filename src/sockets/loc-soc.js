const updateLastLocation = require("../functions/locations");

function locationSocket(io, socket) {
  socket.on("locLive", (loc) => {
    console.log("rec location");
    console.log(loc);
    const location = { lat: loc.latitude, lon: loc.longitude };
    updateLastLocation(location, socket.handshake.query.childId);
  });
}

module.exports = locationSocket;
