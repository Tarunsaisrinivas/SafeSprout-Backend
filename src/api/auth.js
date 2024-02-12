const express = require("express");
const router = express.Router();

const { User } = require("../database/models");

router.post("/login", async (req, res) => {
  console.log("login");

  const { email, password } = req.body;

  console.log(req.body);

  try {
    const usr = await User.findOne({ email: email });
    if (usr) {
      if (usr.password == password) {
        res.json({ stat: true, email: email });
      } else {
        res.json({ stat: false, err: false, usr: true });
      }
    } else {
      res.json({ stat: false, err: false, usr: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ stat: false, err: true });
  }
});

router.post("/signup", async (req, res) => {
  const { password, name, email } = req.body;
  console.log("signup");
  console.log(req.body);

  const usr = await User.findOne({ email: email });
  if (usr) {
    res.json({ stat: false, err: false });
  } else {
    const new_user = new User({
      password: password,
      name: name,
      email: email,
    });
    new_user
      .save()
      .then((resp) => {
        res.json({ stat: true, email: email });
      })
      .catch((err) => {
        console.log(err);
        res.json({ stat: false, err: true });
      });
  }
});

module.exports = router;
