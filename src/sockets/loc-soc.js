const updateLastLocation = require("../functions/locations");
const {
  updateLoc,
  removeId,
  getMap,
  removeKey,
  getKeys,
} = require("../utilities/childMap");

function locationSocket(io, socket) {
  socket.on("locLive", (loc) => {
    console.log("rec location");
    const location = { lat: loc.coords.latitude, lon: loc.coords.longitude };
    updateLastLocation(location, socket.handshake.query.childId);
    console.log("loc in soc");
    console.log(location);
    console.log(socket.handshake.query.childId);
    updateLoc(socket.handshake.query.childId, location);
  });

  socket.on("disconnect", () => {
    const id = getKeys().get(socket.id);
    removeId(id);
    removeKey(socket.id);
  });
}

module.exports = locationSocket;
