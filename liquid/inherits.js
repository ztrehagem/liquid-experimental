module.exports = function(parent, child) {
  return Object.setPrototypeOf(child.prototype, parent.prototype);
};
