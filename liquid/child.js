const { inspect } = require('util');
const analyze = require('./analyze');
const evaluate = require('./evaluate');
const Env = require('./env');
const Q = require('./q');
const decode = require('./decode');

process.on('message', ({ id, code, env }) => {
  // console.log(`[ ${id} ] begin evaluation: ` + code);

  const analyzed = analyze(code);
  const evaluated = evaluate(analyzed, Env.global);

  Q.get(evaluated, (evaluated) => {
    const decoded = decode(evaluated);
    // console.log(`[ ${id} ] evaluated: ` + decoded);

    process.send({ code: decoded }, () => process.exit());
  });
});
