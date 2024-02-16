const { Child, User } = require("../database/models.js");
const { getMap } = require("../utilities/childMap");

function parentSocket(io, socket) {
  const email = socket.handshake.query.email;
  setInterval(async () => {
    const usr = await User.findOne({ email: email });
    usr.children.forEach((id) => {
      const loc = getMap().get(id);
      socket.emit("child-loc-live", { stat: true, loc: loc, id: id });
    });
  }, 5000);
}

module.exports = parentSocket;
