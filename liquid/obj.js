var inherits = require('./inherits.js');

var Obj = module.exports = function(data, next) {
  this.data = data || null;
  this.next = next || null;
};

Obj.prototype.getClass = function() {
  return this.constructor;
};

inherits(Obj, Obj.Cons = require('./obj/cons')(Obj));
inherits(Obj, Obj.Symbol = require('./obj/symbol')(Obj));
inherits(Obj, Obj.Bool = require('./obj/bool')(Obj));
inherits(Obj, Obj.Func = require('./obj/func')(Obj));
