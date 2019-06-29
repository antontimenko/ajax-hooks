"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAjax = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = require("react");

var _objectHash = _interopRequireDefault(require("object-hash"));

var _context5 = _interopRequireDefault(require("./context"));

var useAjaxHooksClient = function useAjaxHooksClient() {
  return (0, _react.useContext)(_context5["default"]);
};

var getRequestHash = function getRequestHash(axiosProps) {
  return (0, _objectHash["default"])(JSON.stringify(axiosProps));
};

var performHttpRequest =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(axiosProps, ajaxHooksClient) {
    var response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return ajaxHooksClient.axios(axiosProps);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", {
              error: null,
              response: response
            });

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              error: _context.t0,
              response: _context.t0.response || null
            });

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function performHttpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var MANUAL_RESULT = {
  loading: false,
  error: null,
  response: null,
  fromCache: null
};
var LOADING_RESULT = {
  loading: true,
  error: null,
  response: null,
  fromCache: null
};

var ajaxOnServer = function ajaxOnServer(axiosProps, _ref2, ajaxHooksClient) {
  var _ref2$manual = _ref2.manual,
      manual = _ref2$manual === void 0 ? false : _ref2$manual,
      _ref2$skipSSR = _ref2.skipSSR,
      skipSSR = _ref2$skipSSR === void 0 ? false : _ref2$skipSSR,
      _ref2$cacheRead = _ref2.cacheRead,
      cacheRead = _ref2$cacheRead === void 0 ? true : _ref2$cacheRead,
      _ref2$cacheWrite = _ref2.cacheWrite,
      cacheWrite = _ref2$cacheWrite === void 0 ? true : _ref2$cacheWrite,
      _ref2$cacheOnetime = _ref2.cacheOnetime,
      cacheOnetime = _ref2$cacheOnetime === void 0 ? false : _ref2$cacheOnetime;
  var result;

  if (manual) {
    result = MANUAL_RESULT;
  } else if (skipSSR || !cacheRead || !cacheWrite) {
    result = LOADING_RESULT;
  } else {
    var requestHash = getRequestHash(axiosProps);
    var cacheResult = ajaxHooksClient.cache.get(requestHash, cacheOnetime);

    if (cacheResult) {
      var error = cacheResult.error,
          response = cacheResult.response;
      result = {
        error: error,
        response: response,
        fromCache: true
      };
    } else {
      if (!ajaxHooksClient.ssrPromises[requestHash]) {
        var requestPromise = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2() {
          var _ref4, error, response;

          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return performHttpRequest(axiosProps, ajaxHooksClient);

                case 2:
                  _ref4 = _context2.sent;
                  error = _ref4.error;
                  response = _ref4.response;
                  ajaxHooksClient.cache.set(requestHash, error, response);

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }))();
        ajaxHooksClient.ssrPromises[requestHash] = requestPromise;
      }

      result = LOADING_RESULT;
    }
  }

  return (0, _objectSpread2["default"])({
    execute: function execute() {
      return function () {
        return null;
      };
    }
  }, result);
};

var getExecuteFunc = function getExecuteFunc(baseAxiosProps, baseOptions, ajaxHooksClient, setResult) {
  return (
    /*#__PURE__*/
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee3() {
      var _ref6,
          _ref6$axiosProps,
          executeAxiosProps,
          _ref6$options,
          executeOptions,
          axiosProps,
          options,
          requestHash,
          cacheRead,
          cacheWrite,
          cacheOnetime,
          cacheResult,
          _error,
          _response,
          _ref7,
          error,
          response,
          _args3 = arguments;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ref6 = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {}, _ref6$axiosProps = _ref6.axiosProps, executeAxiosProps = _ref6$axiosProps === void 0 ? {} : _ref6$axiosProps, _ref6$options = _ref6.options, executeOptions = _ref6$options === void 0 ? {} : _ref6$options;

              if (typeof baseAxiosProps === 'string') {
                baseAxiosProps = {
                  url: baseAxiosProps
                };
              }

              if (typeof executeAxiosProps === 'string') {
                executeAxiosProps = {
                  url: executeAxiosProps
                };
              }

              if (executeOptions.cacheRead === undefined) {
                executeOptions.cacheRead = false;
              }

              axiosProps = (0, _objectSpread2["default"])({}, baseAxiosProps, executeAxiosProps);
              options = (0, _objectSpread2["default"])({}, baseOptions, executeOptions);
              requestHash = getRequestHash(axiosProps);
              cacheRead = options.cacheRead, cacheWrite = options.cacheWrite, cacheOnetime = options.cacheOnetime;

              if (!cacheRead) {
                _context3.next = 14;
                break;
              }

              cacheResult = ajaxHooksClient.cache.get(requestHash, cacheOnetime);

              if (!cacheResult) {
                _context3.next = 14;
                break;
              }

              _error = cacheResult.error, _response = cacheResult.response;
              setResult({
                loading: false,
                error: _error,
                response: _response,
                fromCache: true
              });
              return _context3.abrupt("return");

            case 14:
              setResult(LOADING_RESULT);
              _context3.next = 17;
              return performHttpRequest(axiosProps, ajaxHooksClient);

            case 17:
              _ref7 = _context3.sent;
              error = _ref7.error;
              response = _ref7.response;

              if (cacheWrite) {
                ajaxHooksClient.cache.set(requestHash, error, response);
              }

              setResult({
                loading: false,
                error: error,
                response: response,
                fromCache: false
              });

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))
  );
};

var ajaxOnClient = function ajaxOnClient(axiosProps, _ref8, ajaxHooksClient) {
  var _ref8$manual = _ref8.manual,
      manual = _ref8$manual === void 0 ? false : _ref8$manual,
      _ref8$cacheRead = _ref8.cacheRead,
      cacheRead = _ref8$cacheRead === void 0 ? true : _ref8$cacheRead,
      _ref8$cacheWrite = _ref8.cacheWrite,
      cacheWrite = _ref8$cacheWrite === void 0 ? true : _ref8$cacheWrite,
      _ref8$cacheOnetime = _ref8.cacheOnetime,
      cacheOnetime = _ref8$cacheOnetime === void 0 ? false : _ref8$cacheOnetime;
  var requestHash = getRequestHash(axiosProps);
  axiosProps = (0, _react.useMemo)(function () {
    return axiosProps;
  }, [requestHash]);
  var initResult = (0, _react.useMemo)(function () {
    if (manual) {
      return MANUAL_RESULT;
    }

    if (!cacheRead) {
      return LOADING_RESULT;
    }

    var cacheResult = ajaxHooksClient.cache.get(requestHash, cacheOnetime);

    if (cacheResult) {
      var error = cacheResult.error,
          response = cacheResult.response;
      return {
        loading: false,
        error: error,
        response: response,
        fromCache: true
      };
    }

    return LOADING_RESULT;
  }, [requestHash]);

  var _useState = (0, _react.useState)(initResult),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  (0, _react.useEffect)(function () {
    (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee4() {
      var _ref10, error, response;

      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (manual || initResult.fromCache) {
                _context4.next = 8;
                break;
              }

              _context4.next = 3;
              return performHttpRequest(axiosProps, ajaxHooksClient);

            case 3:
              _ref10 = _context4.sent;
              error = _ref10.error;
              response = _ref10.response;

              if (cacheWrite) {
                ajaxHooksClient.cache.set(requestHash, error, response);
              }

              setResult({
                loading: false,
                error: error,
                response: response,
                fromCache: false
              });

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }, [axiosProps, ajaxHooksClient, requestHash, manual, cacheRead, cacheWrite, cacheOnetime]);
  return (0, _objectSpread2["default"])({
    execute: getExecuteFunc(axiosProps, {
      cacheRead: cacheRead,
      cacheWrite: cacheWrite,
      cacheOnetime: cacheOnetime
    }, ajaxHooksClient, setResult)
  }, result);
};

var useAjax = function useAjax(axiosProps) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ajaxHooksClient = useAjaxHooksClient();

  if (ajaxHooksClient.ssrMode) {
    return ajaxOnServer(axiosProps, options, ajaxHooksClient);
  }

  return ajaxOnClient(axiosProps, options, ajaxHooksClient);
};

exports.useAjax = useAjax;