var util = require('util');
var SceneElement = require('../lib/scene_element');
var builder = require('xmlbuilder');
var Audio;

// Todo - parse the linked sound resource, and keep track of what time the
// audio track is at, so that we can sync up clients, and people can make
// audio-synced visualizations.

function Audio () {
  SceneElement.call(this, 'audio');
}

util.inherits(Audio, SceneElement);

Audio.prototype.reflect = true;

Audio.prototype.play = function () {
  var xml = builder.create('root').ele('event', {
    name: 'play',
    uuid: this.uuid
  }).toString({ pretty: false });

  this.getReflector().emit(xml);
};

Audio.prototype.stop = function () {
  var xml = builder.create('root').ele('event', {
    name: 'stop',
    uuid: this.uuid
  }).toString({ pretty: false });

  this.getReflector().emit(xml);
};

module.exports = Audio;
