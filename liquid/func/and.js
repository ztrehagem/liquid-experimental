var Obj = require('../obj');

module.exports = Obj.Func.createSubr(function(args) {
  var arg1 = args.car();
  var arg2 = args.cdr().car();
  if( arg1.isFalse() ) return arg1;
  return arg2;
});
