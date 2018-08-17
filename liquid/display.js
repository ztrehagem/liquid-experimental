var Obj = require('./obj.js');

var display = module.exports = function(obj) {
  switch(obj.getClass()) {
  case Obj.Cons: display.cons(obj); break;
  case Obj.Symbol: display.symbol(obj); break;
  case Obj.Bool: display.bool(obj); break;
  }
};

display.cons = function(cons) {
  console.log(cons);
};

display.symbol = function(symbol) {
  console.log(symbol);
};

display.bool = function(bool) {
  console.log(bool.data);
};
