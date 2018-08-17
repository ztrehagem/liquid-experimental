module.exports = function(parent) {
  function Cons(car, cdr) {
    parent.call(this, car, cdr);
  }

  Cons.prototype.car = function(data) {
    return (this.data = data || this.data);
  };
  Cons.prototype.cdr = function(data) {
    return (this.next = data || this.next);
  };
  Cons.prototype.isNil = function() {
    return !this.data && !this.next;
  };

  Cons.create = function(car, cdr) {
    return new Cons(car, cdr);
  };

  return Cons;
};
