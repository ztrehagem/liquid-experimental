const uuid = require('node-uuid');
const { inspect } = require('util');
const { fork } = require('child_process');
const Obj = require('../obj');
const Q = require('../q');
const analyze = require('../analyze');
const evaluate = require('../evaluate');
const error = require('../error');
const decode = require('../decode');

module.exports = Obj.Func.createFsubr((args, env) => {
  const id = uuid.v4().slice(-3);

  const code = decode(args.car());
  const child = fork('./liquid/child');

  child.on('error', e => error(`future error [ ${id} ]: `, e));

  return Q((resolve) => {

    child.on('message', ({ code }) => {
      console.log(`[ ${id} ] evaluated: ${code}`);

      const analyzed = analyze(code);
      const evaluated = evaluate(analyzed, env);

      Q.get(evaluated, resolve);
    });

    console.log(`[ ${id} ]    future: ${code}`);
    
    child.send({ id, code, env });
  });
});
