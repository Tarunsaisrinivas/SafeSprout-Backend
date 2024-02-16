const { Child } = require("../database/models");
const distance = require("../functions/distance");

const updateLastLocation = async (loc, childId) => {
  try {
    console.log(loc + " " + childId);
    const child = await Child.findOne({ id: childId });
    console.log("Bef");
    child.lastLocation = loc;
    console.log("Af");
    if (child.locHistory.length === 0) {
      console.log("In if");
      child.locHistory.push({
        time: new Date(),
        loc: loc,
      });
    } else {
      console.log("In else");
      const topLoc = child.locHistory[child.locHistory.length - 1];
      const dist = distance(topLoc, loc);
      console.log(distance);
      if (dist >= 1) {
        child.locHistory.push({
          time: new Date(),
          loc: loc,
        });
      }
    }
    await child.save();
  } catch (err) {
    console.log(err);
    console.log("Error in latets location");
  }
};

module.exports = updateLastLocation;
