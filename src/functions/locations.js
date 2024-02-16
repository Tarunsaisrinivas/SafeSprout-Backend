const { Child } = require("../database/models");
const distance = require("../functions/distance");

const updateLastLocation = async (loc, childId) => {
  console.log("In update");
  console.log(loc);
  console.log(childId);
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
      if (dist >= 2) {
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
