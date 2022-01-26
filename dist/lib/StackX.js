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

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Util = _interopRequireDefault(require("./Util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StackX extends _Util.default {
  constructor(el, option) {
    super(el, option);
    this.init();
  }

  init() {
    setTimeout(() => {
      this.myChart = this.$e.init(this.$el);
      this.setCharts();
      this.myChart.setOption(this.chartOption, true);
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }, 1000);
  }

  setCharts() {
    const field = this.setField();
    this.chartOption = {
      legend: {
        itemHeight: 8,
        itemWidth: 8,
        x: "center",
        //居右显示
        inactiveColor: "rgba(0,0,0,0.3)",
        textStyle: {
          fontSize: 10,
          color: "#999999",
          padding: [3, 0, 0, 0]
        },
        data: field.series.map(item => {
          return {
            name: item.name,
            icon: "rect"
          };
        })
      },
      xAxis: {
        type: "category",
        data: field.axis,
        splitLine: {
          //分割线配置
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#999999",
            fontSize: 10
          }
        },
        axisTick: {
          inside: false,
          show: false
        },
        axisLine: {
          //y轴线的颜色以及宽度
          show: true,
          lineStyle: {
            color: "#C0C7D8",
            type: "dashed",
            width: 1
          }
        }
      },
      grid: {
        left: "1.5%",
        right: "3.7%",
        bottom: "1.2%",
        top: "20%",
        containLabel: true
      },
      tooltip: {
        trigger: "axis"
      },
      yAxis: {
        type: "value",
        splitLine: {
          //分割线配置
          show: true,
          lineStyle: {
            color: "rgba(192, 199, 216, 0.3)",
            type: "dashed"
          }
        },
        axisTick: {
          inside: false
        },
        axisLabel: {
          textStyle: {
            color: "#999999"
          }
        },
        axisLine: {
          //y轴线的颜色以及宽度
          show: true,
          lineStyle: {
            color: "#FFFFFF",
            width: 1
          }
        }
      },
      series: field.series
    };
  }

  setField() {
    const axis = [];
    const series = [];
    const sum = this.sumField();
    console.log(sum);
    this.option.data.map(item => {
      axis.push(item[this.option.recordField]);
      this.option.dataField.map((xItem, xIndex) => {
        var _this$option$seriesFi, _series$xIndex, _this$option$seriesFi2;

        sum[(_this$option$seriesFi = this.option.seriesField[xItem]) === null || _this$option$seriesFi === void 0 ? void 0 : _this$option$seriesFi.stack] ? sum[this.option.seriesField[xItem].stack]-- : "";
        ((_series$xIndex = series[xIndex]) !== null && _series$xIndex !== void 0 ? _series$xIndex : series[xIndex] = {
          data: [],
          type: this.option.seriesField[xItem].type,
          color: this.option.seriesField[xItem].color,
          barWidth: 8,
          stack: this.option.seriesField[xItem].stack,
          name: this.option.seriesField[xItem].name,
          itemStyle: {
            normal: {
              barBorderRadius: sum[(_this$option$seriesFi2 = this.option.seriesField[xItem]) === null || _this$option$seriesFi2 === void 0 ? void 0 : _this$option$seriesFi2.stack] === 0 ? [3, 3, 0, 0] : [0, 0, 0, 0]
            }
          }
        }).data.push({
          value: item[xItem]
        });
      });
    });
    return {
      axis,
      series
    };
  }

  sumField() {
    // 归集 stack合集
    const sum = {};
    this.option.dataField.map(item => {
      var _this$option$seriesFi3;

      if (((_this$option$seriesFi3 = this.option.seriesField[item]) === null || _this$option$seriesFi3 === void 0 ? void 0 : _this$option$seriesFi3.type) === "bar") {
        var _sum$this$option$seri, _this$option$seriesFi4, _this$option$seriesFi5;

        (_sum$this$option$seri = sum[(_this$option$seriesFi4 = this.option.seriesField[item]) === null || _this$option$seriesFi4 === void 0 ? void 0 : _this$option$seriesFi4.stack]) !== null && _sum$this$option$seri !== void 0 ? _sum$this$option$seri : sum[this.option.seriesField[item].stack] = 0;
        sum[(_this$option$seriesFi5 = this.option.seriesField[item]) === null || _this$option$seriesFi5 === void 0 ? void 0 : _this$option$seriesFi5.stack]++;
      }
    });
    return sum;
  }

}

exports.default = StackX;
