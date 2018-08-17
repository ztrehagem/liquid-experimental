module.exports = function(parent) {
  function Bool(id) {
    parent.call(this, id);
  }

  Bool.prototype.isTrue = function() {
    return this === Bool.TRUE;
  };
  Bool.prototype.isFalse = function() {
    return this === Bool.FALSE;
  };

  Bool.TRUE = new Bool('true');
  Bool.FALSE = new Bool('false');

  return Bool;
};
