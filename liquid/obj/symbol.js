module.exports = function(parent) {
  function Symbol(name) {
    parent.call(this, name);
  }

  Symbol.list = [];

  Symbol.create = function(name) {
    var symbol = Symbol.list.find(function(symbol) {
      return symbol.data == name;
    });
    if( !symbol ) {
      symbol = new Symbol(name);
      Symbol.list.push(symbol);
    }
    return symbol;
  };

  return Symbol;
};
