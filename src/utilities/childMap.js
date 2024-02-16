const childMap = new Map();
const keyMap = new Map();

const addKey = (sid, id) => {
  try {
    keyMap.put(sid, id);
  } catch (err) {
    console.log(err);
  }
};

const removeKey = (sid) => {
  try {
    keyMap.delete(sid);
  } catch {
    console.log(err);
  }
};

const getKeys = () => keyMap;

const updateLoc = (id, loc) => {
  childMap.put(id, { lat: loc.latitude, lon: loc.longitude });
};

const removeId = (id) => {
  try {
    childMap.delete(id);
  } catch (err) {
    console.log(err);
  }
};

const getMap = () => childMap;

module.exports = { updateLoc, removeId, getMap, addKey, removeKey, getKeys };
