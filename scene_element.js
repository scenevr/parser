/*

 An element in the scenegraph that has a position, rotation and scale.

 */

var util = require('util');
var Vector = require('./vector');
var Euler = require('./euler');
var Node = require('./node');

function SceneElement () {
  Node.apply(this, arguments);
}

util.inherits(SceneElement, Node);

SceneElement.prototype.removeChild = function () {};

SceneElement.prototype.getReflector = function () {
  return this.ownerDocument.reflector;
};

function createVector (element, x, y, z) {
  var v = new Vector(x, y, z);
  v._element = element;
  return v;
}

function createEuler (element, x, y, z) {
  var e = new Euler(x, y, z);
  e._element = element;
  return e;
}

Object.defineProperties(SceneElement.prototype, {
  position: {
    get: function () {
      return this.getPrivateAttribute('position') || (this.setPrivateAttribute('position', createVector(this, 0, 0, 0)));
    },
    set: function (value) {
      var v;

      if (value instanceof Vector) {
        this._position = createVector(this).copy(value);
      } else if (typeof value === 'string') {
        v = createVector(this).fromArray(value.split(' ').map(parseFloat));

        if (isFinite(v.length())) {
          this._position = v;
        } else {
          throw new Error('Invalid position argument');
        }
      } else {
        throw new Error('Invalid position argument');
      }
    }
  },

  scale: {
    get: function () {
      return this._scale || (this._scale = createVector(this, 1, 1, 1));
    },
    set: function (value) {
      var v;

      if (value instanceof Vector) {
        this._scale = createVector(this).copy(value);
      } else if (typeof value === 'string') {
        v = createVector(this).fromArray(value.split(' ').map(parseFloat));

        if (isFinite(v.length())) {
          this._scale = v;
        } else {
          throw new Error('Invalid scale argument');
        }
      } else {
        throw new Error('Invalid scale argument');
      }
    }
  },

  rotation: {
    get: function () {
      return this._rotation || (this._rotation = createEuler(this, 0, 0, 0));
    },
    set: function (value) {
      var v;

      if (value instanceof Euler) {
        this._rotation = createEuler(this).copy(value);
      } else if (typeof value === 'string') {
        v = createEuler(this).fromArray(value.split(' ').map(parseFloat));

        if (isFinite(v.x) && isFinite(v.y) && isFinite(v.z)) {
          this._rotation = v;
        } else {
          throw new Error('Invalid rotation argument');
        }
      } else {
        throw new Error('Invalid rotation argument');
      }
    }
  }
});

module.exports = SceneElement;
