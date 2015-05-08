var util = require('util');
var SceneElement = require('../lib/scene_element');
var Fog;

function Fog () {
  SceneElement.call(this, 'fog');
}

util.inherits(Fog, SceneElement);

Fog.prototype.reflect = true;

module.exports = Fog;
