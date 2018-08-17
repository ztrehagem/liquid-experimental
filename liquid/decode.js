var Obj = require('./obj');

module.exports = decode;

function decode(obj) {
  switch(obj.getClass()) {
  case Obj.Bool: return decode.bool(obj);
  case Obj.Symbol: return decode.symbol(obj);
  case Obj.Cons: return decode.cons(obj);
  }
}

decode.bool = function(bool) {
  return bool.data;
};

decode.symbol = function(symbol) {
  return symbol.data;
};

decode.cons = function(cons) {
  var strbuf = [];
  strbuf.push('(');

  while (!cons.isNil()) {
    if (strbuf.length > 1) strbuf.push(' ');
    strbuf.push(decode(cons.car()));
    cons = cons.cdr();
  }

  strbuf.push(')');
  return strbuf.join('');
};
