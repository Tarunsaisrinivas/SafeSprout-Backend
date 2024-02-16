const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  password: String,
  name: String,
  email: String,
  children: [String],
});

const chilsSchema = new mongoose.Schema({
  id: String,
  name: String,
  parent: String,
  lastLocation: {
    lat: Number,
    lon: Number,
  },
  locHistory: [
    {
      time: Date,
      loc: { lat: Number, lon: Number },
    },
  ],
});

const pathSchema = new mongoose.Schema({})

const Child = mongoose.model("child", chilsSchema);

const User = mongoose.model("user", userSchema);

module.exports = { User: User, Child: Child };
