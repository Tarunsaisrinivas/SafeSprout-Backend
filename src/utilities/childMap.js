const childMap = new Map();
const keyMap = new Map();

const addKey = (sid, id) => {
  try {
    keyMap.set(sid, id);
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
  try {
    childMap.set(id, loc);
  } catch (err) {
    console.log(err);
  }
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
