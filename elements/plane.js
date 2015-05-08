var util = require('util');
var SceneElement = require('../lib/scene_element');
var Plane;

function Plane () {
  SceneElement.call(this, 'plane');
}

util.inherits(Plane, SceneElement);

Plane.prototype.reflect = true;

module.exports = Plane;
