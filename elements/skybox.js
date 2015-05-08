var util = require('util');
var SceneElement = require('../lib/scene_element');
var Skybox;

function Skybox () {
  SceneElement.call(this, 'skybox');
}

util.inherits(Skybox, SceneElement);

Skybox.prototype.reflect = true;

module.exports = Skybox;
