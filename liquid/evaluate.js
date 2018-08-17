var Obj = require('./obj.js');
var Q = require('./q');

module.exports = evaluate;
function evaluate(obj, env) {
  switch(obj.getClass()) {
  case Obj.Symbol: return associate(obj, env);
  case Obj.Cons: return Q.get(evaluate(obj.car(), env), function(fn) {
    return call(fn, obj.cdr(), env);
  });
  default: return obj;
  }
  error('evaluation error: unknown tag');
}
function associate(key, list) {
  while( !list.isNil() ) {
    if( key == list.car().car() ) return list.car().cdr();
    list = list.cdr();
  }
  error('association error: not defined env key "' + key.name + '"');
}
function call(func, args, env) {
  if( func.isFsubr() )
    return func.getFn()(args, env);
  return Q.get(evaluateArgs(args, env), func.getFn());
}
function evaluateArgs(args, env) {
  var arg = args;
  var promises = [];
  while (!arg.isNil()) {
    promises.push(createPromiseByArg(arg, env));
    arg = arg.cdr();
  }
  return Q.get(Q.parallel(promises), function(evaluatedArgs) {
    var list = Obj.Cons.create();
    evaluatedArgs.reduce(function(tail, evaluatedArg){
      tail.car(evaluatedArg);
      return tail.cdr(Obj.Cons.create());
    }, list);
    return list;
  });
}
function createPromiseByArg(arg, env) {
  return Q.get(evaluate(arg.car(), env), function(evaluated) {
    return evaluated;
  });
}
