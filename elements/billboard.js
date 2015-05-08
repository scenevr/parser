var util = require('util');
var SceneElement = require('../lib/scene_element');
var Billboard;

function Billboard () {
  SceneElement.call(this, 'billboard');
}

util.inherits(Billboard, SceneElement);

Billboard.prototype.reflect = true;

module.exports = Billboard;
