var util = require('util');
var SceneElement = require('../lib/scene_element');
var Model;

function Model () {
  SceneElement.call(this, 'model');
}

util.inherits(Model, SceneElement);

Model.prototype.reflect = true;

module.exports = Model;
