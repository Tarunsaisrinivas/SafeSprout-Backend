const { Child } = require("../database/models");
const distance = require("../functions/distance");

async function updateLastLocation(loc, childId) {
  try {
    console.log(loc + " " + childId);
    const child = await Child.findOne({ id: childId });
    child.lastLocation = loc;
    if (child.locHistory == []) {
      child.locHistory.push({
        time: new Date(),
        loc: loc,
      });
    } else {
      const topLoc = child.locHistory.loc;
      const dist = distance(topLoc, loc);
      if (dist >= 5) {
        child.locHistory.push({
          time: new Date(),
          loc: loc,
        });
      }
    }
    child.save();
  } catch (err) {
    console.log(err);
  }
}

module.exports = updateLastLocation;
