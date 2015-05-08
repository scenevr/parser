var util = require('util');
var SceneElement = require('../lib/scene_element');
var Box;

function Box () {
  SceneElement.call(this, 'box');
}

util.inherits(Box, SceneElement);

Box.prototype.reflect = true;

module.exports = Box;
