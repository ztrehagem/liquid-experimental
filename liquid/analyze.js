var error = require('./error.js');
var Obj = require('./obj.js');

module.exports = function(code) {
  return new Analyzer(code).analyze();
};

var BRACKET_L = '(';
var BRACKET_R = ')';
var BRACKETS = [BRACKET_L,BRACKET_R];
var SPACES = [' ','\n'];
var SEPARATORS = BRACKETS.concat(SPACES);

function Analyzer(code) {
  this.code = code;
  this.head = 0;
}

Analyzer.prototype.analyze = function() {
  return this.inputObject(this.readToken());
};

var Token = Analyzer.Token = function(tag, raw) {
  this.tag = tag;
  this.raw = raw;
};
Token.LIST_L = 'bracket_l';
Token.LIST_R = 'bracket_r';
Token.SYMBOL = 'symbol';

Analyzer.prototype.readToken = function() {
  var c = this.code[this.head];
  while(SPACES.includes(c)) {
    c = this.code[++this.head];
  }
  if( !c ) error('syntax error (readToken head): unexpected EOF');
  if( BRACKETS.includes(c) ) {
    this.head++;
    return new Token(c == BRACKET_L ? Token.LIST_L : Token.LIST_R, c);
  }
  var tail = this.head;
  do {
    c = this.code[++tail];
    // if( !c ) error('syntax error (readToken tail): unexpected EOF');
  } while( c && !SEPARATORS.includes(c) );
  var tokenStr = this.code.substring(this.head, tail);
  this.head = tail;
  return new Token(Token.SYMBOL, tokenStr);
};

Analyzer.prototype.inputObject = function(token) {
  switch(token.tag) {
    case Token.SYMBOL: return Obj.Symbol.create(token.raw);
    case Token.LIST_L: return this.inputList();
    case Token.LIST_R: return null;
  }
  error('syntax error: inputObject');
};

Analyzer.prototype.inputList = function() {
  var list = Obj.Cons.create();
  var tail = list;

  var token;
  while((token = this.readToken()).tag != Token.LIST_R) {
    tail.car(this.inputObject(token));
    tail = tail.cdr(Obj.Cons.create());
  }
  return list;
};
