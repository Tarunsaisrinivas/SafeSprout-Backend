const { Child, User } = require("../database/models.js");
const { getMap } = require("../utilities/childMap");

function parentSocket(io, socket) {
  console.log("In parent socket")
  const email = socket.handshake.query.email;
  setInterval(async () => {
    const usr = await User.findOne({ email: email });
    usr.children.forEach((id) => {
      try {
        const loc = getMap().get(id);
        socket.emit("child-loc-live", { stat: true, loc: loc, id: id });
        socket.emit();
      } catch (err) {
        socket.emit("child-loc-live", { stat: false, id: id });
      }
    });
  }, 5000);
}

module.exports = parentSocket;
