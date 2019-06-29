"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _axios = _interopRequireDefault(require("axios"));

var _cache = _interopRequireDefault(require("./cache"));

var AjaxHooksClient =
/*#__PURE__*/
function () {
  function AjaxHooksClient() {
    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, AjaxHooksClient);
    var axios = init.axios,
        ssrMode = init.ssrMode,
        initialState = init.initialState,
        cacheSize = init.cacheSize;
    this.axios = axios || _axios["default"];
    this.ssrMode = Boolean(ssrMode);
    this.ssrPromises = this.ssrMode ? {} : null;
    this.cache = new _cache["default"]({
      ssrMode: ssrMode,
      initialState: initialState,
      size: cacheSize
    });
  }

  (0, _createClass2["default"])(AjaxHooksClient, [{
    key: "waitSSRRequests",
    value: function () {
      var _waitSSRRequests = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(App) {
        var prevPromisesCount, currentPromisesCount;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                prevPromisesCount = 0;
                currentPromisesCount = 0;

              case 2:
                prevPromisesCount = currentPromisesCount;
                _context.next = 5;
                return Promise.all(Object.values(this.ssrPromises));

              case 5:
                _server["default"].renderToStaticMarkup(App);

                currentPromisesCount = Object.keys(this.ssrPromises).length;

              case 7:
                if (currentPromisesCount !== prevPromisesCount) {
                  _context.next = 2;
                  break;
                }

              case 8:
                return _context.abrupt("return", currentPromisesCount);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function waitSSRRequests(_x) {
        return _waitSSRRequests.apply(this, arguments);
      }

      return waitSSRRequests;
    }()
  }, {
    key: "dumpCache",
    value: function dumpCache() {
      return this.cache.dump();
    }
  }]);
  return AjaxHooksClient;
}();

var _default = AjaxHooksClient;
exports["default"] = _default;