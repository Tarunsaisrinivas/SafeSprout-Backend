const NumUID = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

module.exports = NumUID;