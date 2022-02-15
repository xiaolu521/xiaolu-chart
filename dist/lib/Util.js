"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.regexp.to-string.js");

var E = _interopRequireWildcard(require("echarts"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Util {
  constructor(el, option) {
    _defineProperty(this, "$el", {});

    _defineProperty(this, "$e", {});

    _defineProperty(this, "chartOption", {});

    _defineProperty(this, "myChart", {});

    _defineProperty(this, "option", {});

    _defineProperty(this, "legendIcon", "path://M-65,40a8.009,8.009,0,0,1-8-8V6a8.008,8.008,0,0,1,8-8h26a8.009,8.009,0,0,1,8,8V32a8.01,8.01,0,0,1-8,8ZM-67,6V32a2,2,0,0,0,2,2h26a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2H-65A2,2,0,0,0-67,6Zm5,25a2,2,0,0,1-2-2V9a2,2,0,0,1,2-2h20a2,2,0,0,1,2,2V29a2,2,0,0,1-2,2Z");

    // 设定容器定位，不然里面tips 瞎几把飘
    el.style.position = "relative";
    this.$el = el;
    this.$e = E;
    this.option = option;
  }
  /***
   * 16进制转rgba
   * @param colors
   * @param opacity
   * @returns {string}
   */


  colorRgb(colors, opacity) {
    // 16进制颜色值的正则
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 把颜色值变成小写

    const color = colors.toLowerCase();

    if (reg.test(color)) {
      const colorChange = [];

      for (let i = 1; i < 7; i += 2) {
        colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
      }

      return "rgba(".concat(colorChange.join(","), ",").concat(opacity, ")");
    } else {
      return color;
    }
  }
  /***
   * 图表的tips
   * @param params
   * @returns {string}
   */


  setFormatter(params) {
    var _params$;

    return "<div style=\"width:300px;padding: 10px 20px;\">\n            <div style=\"opacity: 0.8;font-size: 12px;padding-bottom: 8px;\">".concat(((_params$ = params[0]) === null || _params$ === void 0 ? void 0 : _params$.name) || "", "</div>\n            ").concat(params.map(item => {
      return "\n                        <div style=\"display:flex;justify-content:space-between;margin-top: 8px;font-size: 12px;\">\n                          <div style=\"font-size: 16px;color: ".concat(typeof item.color === "string" ? item.color : item.color.colorStops[0].color, ";font-weight: bold;\">").concat(item.data.value, "</div>\n                          <div style=\"font-size: 12px;color: #FFF;\">").concat(item.seriesName, "</div>\n                        </div>\n                        ");
    }).join(""), "\n          </div>");
  }
  /***
   * 重载charts
   * @param option
   */


  reloadOption(option) {
    this.option = _objectSpread(_objectSpread({}, this.option), option);
    this.setCharts();
    this.myChart.setOption(this.chartOption, true);
    setTimeout(() => {
      this.myChart.resize();
    });
  }
  /***
   * 随机获取颜色
   */


  static getRandomColor() {
    return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
  }

  destroy() {
    this.$el.innerHTML = "";
    this.$el.setAttribute("_echarts_instance_", "");
  }

}

exports.default = Util;

_defineProperty(Util, "colors", ["#f16e5e", "#44d7b6", "#3BABFF", "#A059CC", "#f7b500", "#999999", "#dbdbdb", "#65bdff"]);