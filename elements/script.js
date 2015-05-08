var util = require('util');
var Element = require('../element');
var Script;

function Script () {
  Element.call(this, 'script');
}

util.inherits(Script, Element);

module.exports = Script;
