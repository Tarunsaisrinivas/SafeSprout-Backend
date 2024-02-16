const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { dbConnector } = require("./src/const");

mongoose
  .connect(dbConnector)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error in connecting DB");
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userAuth = require("./src/api/auth");
app.use("/api/auth", userAuth);

const childApi = require("./src/api/child");
app.use("/api/child", childApi);

const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);

const io = socketIO(server);
const socketHandler = require("./src/sockets/socket-main");
socketHandler.setupSocketIO(io);

const port = 4040;
server.listen(4040, () => {
  console.log(`Server is running on port: ${port}`);
});
