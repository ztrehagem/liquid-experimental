var fs = require('fs');
var minimist = require('minimist');
var options = minimist(process.argv.slice(2));
var error = require('./error');

var filename = options._[0];
var encode = options.encode || 'utf-8';

if( !filename ) {
  error('require file input');
}

module.exports = fs.readFileSync(filename, encode);
