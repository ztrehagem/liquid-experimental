module.exports = function(parent) {
  function Func(fn, tag) {
    parent.call(this, fn, tag);
  }

  Func.prototype.isSubr = function() {
    return this.next == Func.SUBR;
  };
  Func.prototype.isFsubr = function() {
    return this.next == Func.FSUBR;
  };
  Func.prototype.getFn = function() {
    return this.data;
  };

  Func.SUBR = 'subr';
  Func.FSUBR = 'fsubr';

  // ファクトリーメソッド
  Func.createSubr = function(fn) {
    return new Func(fn, Func.SUBR);
  };
  Func.createFsubr = function(fn) {
    return new Func(fn, Func.FSUBR);
  };

  return Func;
};
