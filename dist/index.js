"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BarExtreme = _interopRequireDefault(require("./lib/BarExtreme"));

var _BarGrey = _interopRequireDefault(require("./lib/BarGrey"));

var _Normal = _interopRequireDefault(require("./lib/Normal"));

var _Pie = _interopRequireDefault(require("./lib/Pie"));

var _StackX = _interopRequireDefault(require("./lib/StackX"));

var _StackY = _interopRequireDefault(require("./lib/StackY"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * MIT License
 *
 * Copyright 2021-present xiaolu521
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
var _default = {
  BarExtreme: _BarExtreme.default,
  BarGrey: _BarGrey.default,
  Normal: _Normal.default,
  Pie: _Pie.default,
  StackX: _StackX.default,
  StackY: _StackY.default
};
exports.default = _default;