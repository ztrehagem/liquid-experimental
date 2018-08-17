var Obj = require('./obj.js');

var Env = module.exports = {};

Env.global = Obj.Cons.create();

// XXX 関数スコープを考慮したenv分離
Env.add = function(env, symbol, obj) {
  var cons = Obj.Cons.create(symbol, obj);
  while( !env.isNil() ) env = env.cdr();
  env.car(cons);
  env.cdr(Obj.Cons.create());
};

// -- primitive functions
Env.add(Env.global, Obj.Symbol.create('true'), Obj.Bool.TRUE);
Env.add(Env.global, Obj.Symbol.create('false'), Obj.Bool.FALSE);
Env.add(Env.global, Obj.Symbol.create('and'), require('./func/and'));
Env.add(Env.global, Obj.Symbol.create('future'), require('./func/future'));
