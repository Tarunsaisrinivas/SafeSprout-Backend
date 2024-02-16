const express = require("express");
const router = express.Router();

const { User } = require("../database/models");
const { Child } = require("../database/models");
const NumUID = require("../utilities/uniqueid"); // Importing NumUID properly

router.post("/create-new", async (req, res) => {
  const { childName, email, password } = req.body;
  try {
    const parent = await User.findOne({ email: email });
    if (parent) {
      if (parent.password === password) {
        const id = NumUID(); // Now using NumUID properly
        const newChild = new Child({
          id: id,
          name: childName,
          parent: email,
        });
        try {
          newChild.save();
          const usr = await User.findOne({ email: email });
          usr.children.push(id);
          usr.save();
          res.json({ stat: true, err: false, childId: id });
        } catch (err) {
          console.log(err);
          res.json({ stat: false, err: false });
        }
      } else {
        res.json({ stat: false, usr: true, err: false });
      }
    } else {
      res.json({ stat: false, usr: false, err: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ stat: false, err: true });
  }
});

router.post("/get-child-list", async (req, res) => {
  const { email } = req.body;
  try {
    const usr = await User.findOne({ email: email });
    if (usr) {
      const list = usr.children;
      res.json({ stat: true, children: list });
    } else {
      res.json({ stat: false, err: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ stat: false, err: true });
  }
});

router.get("/get-child-meta-info", async (req, res) => {
  const { id } = req.body;
  try {
    const child = await Child.findOne({ id: id });
    if (child) {
      res.json({ id: child.id, name: child.name, stat: true });
    } else {
      res.json({ stat: false, err: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ stat: false, err: true });
  }
});

module.exports = router;
