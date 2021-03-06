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

import Util from "./Util";

export default class Normal extends Util {
    constructor(el, option) {
        super(el, option);
        this.init();
    }

    init() {
        setTimeout(()=>{
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
                x: "center", //居右显示
                inactiveColor: "rgba(0,0,0,0.3)",
                textStyle: {
                    fontSize:10,
                    color: "#999999",
                    padding: [3, 0, 0, 0],
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
                splitLine: {//分割线配置
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: "#999999",
                        fontSize:10
                    },
                },
                axisTick: {
                    inside: false,
                    show: false
                },
                axisLine: {//y轴线的颜色以及宽度
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
                top:"20%",
                containLabel: true
            },
            tooltip: {
                trigger: "axis"
            },
            yAxis: {
                type: "value",
                splitLine: {//分割线配置
                    show: true,
                    lineStyle:{
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
                    },
                },
                axisLine: {//y轴线的颜色以及宽度
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

        this.option.data.map((item) => {
            axis.push(item[this.option.recordField]);
            this.option.dataField.map((xItem, xIndex) => {
                (series[xIndex] ?? (series[xIndex] = {
                    data: [],
                    type: this.option.seriesField[xItem].type,
                    color:this.option.seriesField[xItem].color,
                    symbolSize: 4,
                    symbol: "circle",
                    barWidth:  8,
                    smooth: this.option.seriesField[xItem].smooth === 1,
                    areaStyle: this.option.seriesField[xItem].areaStyle === 1 ? {
                        color:new this.$e.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.colorRgb(this.option.seriesField[xItem]?.color, 1) // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: this.colorRgb(this.option.seriesField[xItem]?.color, 0)  // 100% 处的颜色
                        }], false),
                    } : null,
                    name: this.option.seriesField[xItem].name,
                    itemStyle: {
                        normal: {
                            barBorderRadius: [3, 3, 0, 0],
                            lineStyle:{
                                width:1
                            }
                        }
                    }
                })).data.push({
                    value: item[xItem]
                });
            });
        });
        return {
            axis,
            series
        };
    }
}
