var util = require('util');
var SceneElement = require('../lib/scene_element');
var Link;

function Link () {
  SceneElement.call(this, 'link');
}

util.inherits(Link, SceneElement);

Link.prototype.reflect = true;

module.exports = Link;
