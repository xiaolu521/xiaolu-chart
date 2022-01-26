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

export default class Pie extends Util {
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
            baseOption: {
                legend: {
                    itemHeight: 8,
                    itemWidth: 8,
                    bottom: 20,
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
                series: [
                    {
                        type: "pie",
                        center: ["50%", "40%"],
                        radius: ["40%", "60%"],
                        label: {
                            show: true,
                            formatter: (params)=>{
                                return `{name|${params.name}}\n{unit|(${(params.value / field.total * 100).toFixed(2)}%)}`;
                            },
                            rich: {
                                name: {
                                    fontSize: 10,
                                    color: "#333333"
                                },
                                unit: {
                                    fontSize: 10,
                                    color: "#00C49A"
                                }
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        itemStyle: {
                            emphasis: {
                                borderWidth: 0,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        data: field.series
                    },
                    {
                        type: "pie",
                        center: ["50%", "40%"],
                        radius: ["40%", "60%"],
                        label: {
                            show: false,
                            position:"center",
                            formatter: (params)=>{
                                return `{value|${params.value}}{unit|个}\n{name|${params.name}}`;
                            },
                            rich: {
                                value: {
                                    fontSize: 14,
                                    color: "#00C49A"
                                },
                                unit: {
                                    fontSize: 10,
                                    color: "#333333"
                                },
                                name: {
                                    fontSize: 10,
                                    color: "#333333"
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: "16"
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        itemStyle: {
                            emphasis: {
                                borderWidth: 0,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        },
                        data: field.series
                    }
                ],
                color: field.colors
            }
        };

    }

    setField() {
        let total = 0;
        const colors = [];
        const series = Object.keys(this.option.data).map((item) => {
            colors.push(this.option.seriesField[item].color);
            total += this.option.data[item];
            return {
                value: this.option.data[item],
                name: this.option.seriesField[item].name
            };
        });

        return {
            colors,
            series,
            total
        };
    }
}
