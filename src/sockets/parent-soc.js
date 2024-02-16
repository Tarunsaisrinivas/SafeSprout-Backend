const { Child } = require("../database/models.js");
const { getMap } = require("../utilities/childMap");

function parentSocket(io, socket) {
  console.log("in parent socket");
  socket.on("get-child-live", async (id) => {
    console.log("get socket call");
    console.log(id);
    try {
      const map = getMap();
      console.log(id);
      console.log(map);
      socket.emit("child-live-loc", (id, map.get(id)));
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = parentSocket;
