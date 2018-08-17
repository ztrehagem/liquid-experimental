var inspect = require('util').inspect;
var code = require('./code.js');
var analyze = require('./analyze.js');
var evaluate = require('./evaluate.js');
var Env = require('./env.js');
var display = require('./display.js');
var Q = require('./q');

console.log(code);

console.log('\n--- analyze ---');
var analyzed = analyze(code);
console.log(inspect(analyzed, { depth: null }));

console.log('\n--- evaluate ---');
var evaluated = evaluate(analyzed, Env.global);

Q.get(evaluated, function(evaluated) {
  console.log(inspect(evaluated, { depth: null }));

  console.log('\n---- result ----');
  display(evaluated);
});
