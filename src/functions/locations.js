const { Child } = require("../database/models");
const distance = require("../functions/distance");

const updateLastLocation = async (loc, childId) => {
  console.log("ChildID");
  console.log(childId);
  console.log("loc in up");
  console.log(loc);
  try {
    console.log(loc + " " + childId);
    const child = await Child.findOne({ id: childId });
    if (child) {
      console.log("Bef");
      console.log(child);
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
        console.log("top loc");
        console.log(topLoc.loc);
        console.log("loc");
        console.log(loc);
        const dist = distance(topLoc.loc, loc);
        console.log(dist);
        if (dist >= 1) {
          child.locHistory.push({
            time: new Date(),
            loc: loc,
          });
        }
      }
      await child.save();
    }
  } catch (err) {
    console.log(err);
    console.log("Error in latets location");
  }
};

module.exports = updateLastLocation;
