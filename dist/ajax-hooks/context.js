"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _client = _interopRequireDefault(require("./client"));

var defaultAjaxHooksClient = new _client["default"]();

var AjaxHooksContext = _react["default"].createContext(defaultAjaxHooksClient);

var _default = AjaxHooksContext;
exports["default"] = _default;