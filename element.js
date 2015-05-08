/*

  An element in the scene graph that is not reflected, but can be serialized to xml, and has private attributes.

*/

var util = require('util');
var htmlparser = require('htmlparser2');
var dom = require('dom-lite');
var HTMLElement = dom.HTMLElement;

function Element () {
  HTMLElement.apply(this, arguments);

  var privateAttributes = {};

  this.getPrivateAttribute = function (key) {
    return privateAttributes[key];
  };

  this.setPrivateAttribute = function (key, value) {
    privateAttributes[key] = value;
    return value;
  };

  this.removePrivateAttribute = function (key) {
    delete privateAttributes[key];
  };
}

util.inherits(Element, HTMLElement);

Object.defineProperty(Element.prototype, 'innerXML', {
  get: function () {
    return Element.prototype.toString.call(this);
  },
  set: function (xml) {
    var self = this;

    var parser;

    var addChildren = function (root, nodes) {
      var el, key, node, value, _i, _len, _ref, _results;
      _results = [];

      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];

        if (node.type === 'text') {
          el = self.ownerDocument.createTextElement(node.data);
        } else if (node.type === 'cdata') {
          el = self.ownerDocument.createCDataElement(node.children[0].data);
        } else if (node.type === 'comment') {
          el = self.ownerDocument.createComment(node.data);
        } else if (node.type === 'tag' || node.type === 'script') {
          el = self.ownerDocument.createElement(node.name.toLowerCase());

          if (el instanceof Element) {
            el.setPrivateAttribute('startIndex', node.startIndex);
          }

          _ref = node.attribs;
          for (key in _ref) {
            value = _ref[key];
            el.setAttribute(key, value);
          }
          addChildren(el, node.children);
        } else {
          continue;
        }
        _results.push(root.appendChild(el));
      }
      return _results;
    };

    var handler = new htmlparser.DomHandler(function (err, nodes) {
      if (err) {
        throw err;
      }
      self.childElements = [];
      addChildren(self, nodes);
    }, {
      withStartIndices: true
    });

    parser = new htmlparser.Parser(handler, {
      xmlMode: true
    });

    parser.write(xml);
    parser.end();
  }
});

Element.packetParser = function (xml) {
  var addChildren = function (root, nodes) {
    var key, node, value, _el, _i, _len, _ref, _results;
    _results = [];
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
      _el = new HTMLElement(node.name.toLowerCase());
      _ref = node.attribs;
      for (key in _ref) {
        value = _ref[key];
        _el.setAttribute(key, value);
      }
      _results.push(root.appendChild(_el));
    }
    return _results;
  };

  var el = null;

  var parser = new htmlparser.Parser(new htmlparser.DomHandler(function (err, nodes) {
    var node, _i, _len, _results;

    if (err) {
      throw err;
    }

    _results = [];

    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      node = nodes[_i];
      el = new HTMLElement(node.name.toLowerCase());
      _results.push(addChildren(el, node.children));
    }

    return _results;
  }), {
    xmlMode: true
  });
  parser.write(xml);
  parser.end();

  return el;
};

module.exports = Element;
