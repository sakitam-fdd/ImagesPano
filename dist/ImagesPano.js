(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ImagesPano", [], factory);
	else if(typeof exports === 'object')
		exports["ImagesPano"] = factory();
	else
		root["ImagesPano"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var isCanvasSupported = function isCanvasSupported() {
  var canvas = document.createElement('canvas');
  return !!(canvas.getContext && canvas.getContext('2d'));
};

var isWebGLSupported = function isWebGLSupported() {
  var canvas = document.createElement('canvas');
  return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
};

exports.isCanvasSupported = isCanvasSupported;
exports.isWebGLSupported = isWebGLSupported;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeListener = exports.addListener = exports.getDomEventKey = exports.createHidden = exports.setClass = exports.removeClass = exports.addClass = exports.hasClass = exports.toBack = exports.toFront = exports.empty = exports.remove = exports.create = exports.getStyle = exports.getClass = exports.getElementsByClassName = exports.getChildByTagName = exports.get = undefined;

var _utils = __webpack_require__(6);

var get = exports.get = function get(id) {
  return typeof id === 'string' ? document.getElementById(id) : id;
};

var getChildByTagName = exports.getChildByTagName = function getChildByTagName(str, container) {
  return container.getElementsByTagName(str);
};

var getElementsByClassName = exports.getElementsByClassName = function getElementsByClassName(str, container, root) {
  var _root = root || window;
  var $ = _root.document.querySelector.bind(_root.document);

  var target = $(str);
  return target;
};

var getClass = exports.getClass = function getClass(elem) {
  return elem.getAttribute && elem.getAttribute('class') || '';
};

var getStyle = exports.getStyle = function getStyle(el, style) {
  var value = el.style[style] || el.currentStyle && el.currentStyle[style];
  if ((!value || value === 'auto') && document.defaultView) {
    var css = document.defaultView.getComputedStyle(el, null);
    value = css ? css[style] : null;
  }
  return value === 'auto' ? null : value;
};

var create = exports.create = function create(tagName, className, container, id) {
  var el = document.createElement(tagName);
  el.className = className || '';
  if (id) {
    el.id = id;
  }
  if (container) {
    container.appendChild(el);
  }
  return el;
};

var remove = exports.remove = function remove(el) {
  var parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
};

var empty = exports.empty = function empty(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

var toFront = exports.toFront = function toFront(el) {
  el.parentNode.appendChild(el);
};

var toBack = exports.toBack = function toBack(el) {
  var parent = el.parentNode;
  parent.insertBefore(el, parent.firstChild);
};

var hasClass = exports.hasClass = function hasClass(el, name) {
  if (el.classList !== undefined) {
    return el.classList.contains(name);
  }
  var className = getClass(el);
  return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
};

var addClass = exports.addClass = function addClass(el, name) {
  if (el.classList !== undefined) {
    var classes = (0, _utils.splitWords)(name);
    for (var i = 0, len = classes.length; i < len; i++) {
      el.classList.add(classes[i]);
    }
  } else if (!hasClass(el, name)) {
    var className = getClass(el);
    setClass(el, (className ? className + ' ' : '') + name);
  }
};

var removeClass = exports.removeClass = function removeClass(el, name) {
  if (el.classList !== undefined) {
    el.classList.remove(name);
  } else {
    setClass(el, String.trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
  }
};

var setClass = exports.setClass = function setClass(el, name) {
  if (el.className.baseVal === undefined) {
    el.className = name;
  } else {
    el.className.baseVal = name;
  }
};

var createHidden = exports.createHidden = function createHidden(tagName, parent, id) {
  var element = document.createElement(tagName);
  element.style.display = 'none';
  if (id) {
    element.id = id;
  }
  if (parent) {
    parent.appendChild(element);
  }
  return element;
};

var getDomEventKey = exports.getDomEventKey = function getDomEventKey(type, fn, context) {
  return '_p_dom_event_' + type + '_' + (0, _utils.stamp)(fn) + (context ? '_' + (0, _utils.stamp)(context) : '');
};

var addListener = exports.addListener = function addListener(element, type, fn, context) {
  var eventKey = getDomEventKey(type, fn, context);
  var handler = element[eventKey];
  if (handler) {
    return this;
  }
  handler = function handler(e) {
    return fn.call(context || element, e);
  };
  if ('addEventListener' in element) {
    element.addEventListener(type, handler, false);
  } else if ('attachEvent' in element) {
    element.attachEvent('on' + type, handler);
  }
  element[eventKey] = handler;
  return this;
};

var removeListener = exports.removeListener = function removeListener(element, type, fn, context) {
  var eventKey = getDomEventKey(type, fn, context);
  var handler = element[eventKey];
  if (!handler) {
    return this;
  }
  if ('removeEventListener' in element) {
    element.removeEventListener(type, handler, false);
  } else if ('detachEvent' in element) {
    element.detachEvent('on' + type, handler);
  }
  element[eventKey] = null;
  return this;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxUtil = function () {
  function AjaxUtil() {
    _classCallCheck(this, AjaxUtil);
  }

  _createClass(AjaxUtil, [{
    key: 'loadXMP',
    value: function loadXMP() {
      var _this = this;

      var xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
          xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
      } else {
        this.container.textContent = 'XHR is not supported, update your browser!';
        return false;
      }
      return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject('error');
          }
        };
        xhr.open('GET', _this.options['panorama'], true);
        xhr.send(null);
      });
    }
  }]);

  return AjaxUtil;
}();

exports.default = AjaxUtil;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mix = function mix() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  var Mix = function Mix() {
    _classCallCheck(this, Mix);
  };

  for (var key in mixins) {
    var mixin = mixins[key];
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
};

var copyProperties = function copyProperties(target, source) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Reflect.ownKeys(source)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      if (key !== 'constructor' && key !== 'prototype' && key !== 'name' && key !== 'length') {
        var desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

exports.default = mix;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtils = __webpack_require__(1);

var DomUtils = _interopRequireWildcard(_domUtils);

var _browser = __webpack_require__(0);

var browserUtils = _interopRequireWildcard(_browser);

var _mixin = __webpack_require__(3);

var _mixin2 = _interopRequireDefault(_mixin);

var _ajax = __webpack_require__(2);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(4);

var ImagesPano = function (_mix) {
  _inherits(ImagesPano, _mix);

  function ImagesPano(params) {
    _classCallCheck(this, ImagesPano);

    var _this = _possibleConstructorReturn(this, (ImagesPano.__proto__ || Object.getPrototypeOf(ImagesPano)).call(this));

    _this.version = '1.0.0';

    _this.options = params || {};

    _this.container = typeof _this.options['container'] === 'string' ? document.getElementById(_this.options['container']) : _this.options['container'];

    _this.loadingText = _this.options['loadingText'] !== undefined ? _this.options['loadingText'] : null;

    _this.containerInner = DomUtils.create('div', 'images-pano-content-inner');

    _this.readxmp = _this.options['useXmpData'] !== undefined ? !!_this.options['useXmpData'] : true;

    _this.corsAnonymous = _this.options['corsAnonymous'] !== undefined ? !!_this.options['corsAnonymous'] : true;

    _this.init();
    return _this;
  }

  _createClass(ImagesPano, [{
    key: 'getVersion',
    value: function getVersion() {
      return this.version;
    }
  }, {
    key: 'init',
    value: function init() {
      if (this.loadingText && this.container) {
        this.container.innerText = this.loadingText;
      } else {
        this.container.innerText = '正在加载中。。。';
      }

      if (!browserUtils.isCanvasSupported()) {
        this.container.textContent = 'Canvas is not supported, update your browser!';
        return false;
      }

      if (window.THREE === undefined) {
        console.log('THREE is not load');
        this.container.textContent = 'THREE is not load';
        return false;
      }

      if (this.readxmp && !this.options['panorama'].match(/^data:image\/[a-z]+;base64/)) {
        this.loadXMP().then(function (res) {
          console.log(res);
        }).catch(function (error) {
          console.log(error);
        });
      } else {
        this.createBuffer();
      }
    }
  }, {
    key: 'createBuffer',
    value: function createBuffer() {
      console.log('buffer');
    }
  }]);

  return ImagesPano;
}((0, _mixin2.default)(_ajax2.default));

exports.default = ImagesPano;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getrandom = exports.getrandom = function getrandom(t1, t2, t3) {
  if (!t1 || isNaN(t1)) {
    t1 = 0;
  }
  if (!t2 || isNaN(t2)) {
    t2 = 1;
  }
  if (!t3 || isNaN(t3)) {
    t3 = 0;
  }
  t3 = t3 > 15 ? 15 : t3;
  var _ref = [Math.random() * (t2 - t1) + t1, Math.pow(10, t3)],
      ra = _ref[0],
      du = _ref[1];

  ra = Math.round(ra * du) / du;
  return ra;
};

var getuuid = exports.getuuid = function getuuid() {
  var s = [],
      hexDigits = '0123456789abcdef';

  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
};

var trim = exports.trim = function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
};

var splitWords = exports.splitWords = function splitWords(str) {
  return trim(str).split(/\s+/);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=ImagesPano.js.map