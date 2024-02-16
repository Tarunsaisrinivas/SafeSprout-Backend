const { updateLastLocation } = require("../functions/locations");

function locationSocket(io, socket) {
  try {
    socket.on("locLive", (loc) => {
      console.log("rec location");
      console.log(loc);
      const location = { lat: loc.latitude, lon: loc.longitude };
      updateLastLocation(location, socket.handshake.query.childId);
    });
  } catch (err) {
    console.log("Error occured");
    console.log(err);
  }
}

module.exports = locationSocket;
