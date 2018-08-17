module.exports = Q;
var error = require('./error');

function Q(fn) {
  return new Promise(fn);
}

Q.parallel = function(promises) {
  if (promises.some(function(promise) {
    return promise instanceof Promise;
  })) {
    return Promise.all(promises);
  } else {
    return promises;
  }
};

Q.get = function(promise, fn, errorHandler) {
  if( promise instanceof Promise ) {
    return promise.then(fn).catch(typeof errorHandler != 'string' ? errorHandler : function() {
      console.error(errorHandler || 'promise error');
      return Promise.reject();
    });
  }
  return fn(promise);
};
