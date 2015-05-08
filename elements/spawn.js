var util = require('util');
var SceneElement = require('../lib/scene_element');
var Spawn;

function Spawn () {
  SceneElement.call(this, 'spawn');
}

util.inherits(Spawn, SceneElement);

Spawn.prototype.reflect = true;

module.exports = Spawn;
