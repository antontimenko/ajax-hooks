"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _client = _interopRequireDefault(require("./client"));

var _context = _interopRequireDefault(require("./context"));

var AjaxHooksProvider = function AjaxHooksProvider(_ref) {
  var client = _ref.client,
      children = _ref.children;

  if (client.ssrMode) {
    client.cache.resetOneTimeCounts();
  }

  return _react["default"].createElement(_context["default"].Provider, {
    value: client
  }, children);
};

AjaxHooksProvider.propTypes = {
  client: _propTypes["default"].instanceOf(_client["default"]).isRequired,
  children: _propTypes["default"].node.isRequired
};
var _default = AjaxHooksProvider;
exports["default"] = _default;