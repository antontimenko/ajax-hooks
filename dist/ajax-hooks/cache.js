"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _lruCache = _interopRequireDefault(require("lru-cache"));

var AjaxHooksCache =
/*#__PURE__*/
function () {
  function AjaxHooksCache(_ref) {
    var _ref$ssrMode = _ref.ssrMode,
        ssrMode = _ref$ssrMode === void 0 ? false : _ref$ssrMode,
        initialState = _ref.initialState,
        size = _ref.size;
    (0, _classCallCheck2["default"])(this, AjaxHooksCache);
    this.lru = new _lruCache["default"](size);

    if (initialState) {
      this.lru.load(JSON.parse(JSON.stringify(initialState)));
    }

    this.ssrMode = ssrMode;
  }

  (0, _createClass2["default"])(AjaxHooksCache, [{
    key: "set",
    value: function set(hash, error, response) {
      var cachedResponse = null;

      if (response) {
        var data = response.data,
            status = response.status,
            statusText = response.statusText,
            headers = response.headers;
        cachedResponse = {
          data: data,
          status: status,
          statusText: statusText,
          headers: headers
        };
      }

      this.lru.set(hash, {
        error: error,
        response: cachedResponse,
        onetimeCount: 0
      });
    }
  }, {
    key: "get",
    value: function get(hash) {
      var onetime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var result = this.lru.get(hash);

      if (result) {
        if (onetime) {
          if (this.ssrMode) {
            result.onetimeCount += 1;
            return result;
          }

          if (result.onetimeCount) {
            result.onetimeCount -= 1;
            return result;
          }

          return null;
        }

        return result;
      }

      return null;
    }
  }, {
    key: "dump",
    value: function dump() {
      return this.lru.dump();
    }
  }, {
    key: "resetOneTimeCounts",
    value: function resetOneTimeCounts() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.lru.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var result = _step.value;
          result.onetimeCount = 0;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);
  return AjaxHooksCache;
}();

var _default = AjaxHooksCache;
exports["default"] = _default;