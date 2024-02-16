const { Child } = require("../database/models.js");

function parentSocket(io, socket) {
  socket.on("get-child-live", async (id) => {
    socket.emit("child-live-loc", (id, loc));
    try {
      const child = await Child.findOne({ id: id });
      socket.emit("child-live-loc", (id, child.lastLocation));
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = parentSocket;
