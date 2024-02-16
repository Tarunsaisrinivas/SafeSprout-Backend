const { Child } = require("../database/models");
const distance = require("../functions/distance");

const updateLastLocation = async (loc, childId) => {
  try {
    const child = await Child.findOne({ id: childId });
    if (child) {
      child.lastLocation = loc;
      if (child.locHistory.length === 0) {
        child.locHistory.push({
          time: new Date(),
          loc: loc,
        });
      } else {
        const topLoc = child.locHistory[child.locHistory.length - 1];
        const dist = distance(topLoc.loc, loc);
        if (dist >= 0) {
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
