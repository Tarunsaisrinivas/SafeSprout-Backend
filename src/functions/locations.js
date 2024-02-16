const { Child } = require("../database/models");
const distance = require("../functions/distance");

const updateLastLocation = async (loc, childId) => {
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
    await child.save(); // <-- Added await here to ensure the save operation is complete before continuing
  } catch (err) {
    console.log(err);
  }
};

module.exports = updateLastLocation;
