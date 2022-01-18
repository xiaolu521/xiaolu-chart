/*
 * MIT License
 *
 * Copyright 2021-present woodare_xiaolu and other contributors
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

import * as E from "echarts";

export default class Util {
    $el = {};
    $e = {};
    chartOption = {};
    myChart = {};
    option = {};
    legendIcon = "path://M-65,40a8.009,8.009,0,0,1-8-8V6a8.008,8.008,0,0,1,8-8h26a8.009,8.009,0,0,1,8,8V32a8.01,8.01,0,0,1-8,8ZM-67,6V32a2,2,0,0,0,2,2h26a2,2,0,0,0,2-2V6a2,2,0,0,0-2-2H-65A2,2,0,0,0-67,6Zm5,25a2,2,0,0,1-2-2V9a2,2,0,0,1,2-2h20a2,2,0,0,1,2,2V29a2,2,0,0,1-2,2Z";

    static colors = [
        "#f16e5e",
        "#44d7b6",
        "#3BABFF",
        "#A059CC",
        "#f7b500",
        "#999999",
        "#dbdbdb",
        "#65bdff",
    ];

    constructor(el, option) {
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
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        const color = colors.toLowerCase();

        if (reg.test(color)) {
            const colorChange = [];

            for (let i = 1; i < 7; i += 2) {
                colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
            }
            return `rgba(${colorChange.join(",")},${opacity})`;
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
        return `<div style="width:300px;padding: 10px 20px;">
            <div style="opacity: 0.8;font-size: 12px;padding-bottom: 8px;">${params[0]?.name || ""}</div>
            ${params.map((item) => {
        return `
                        <div style="display:flex;justify-content:space-between;margin-top: 8px;font-size: 12px;">
                          <div style="font-size: 16px;color: ${typeof item.color === "string" ? item.color : item.color.colorStops[0].color};font-weight: bold;">${item.data.value}</div>
                          <div style="font-size: 12px;color: #FFF;">${item.seriesName}</div>
                        </div>
                        `;
    }).join("")}
          </div>`;
    }


    /***
     * 重载charts
     * @param option
     */
    reloadOption(option) {
        this.option = {...this.option, ...option};
        this.setCharts();
        this.myChart.setOption(this.chartOption, true);
        setTimeout(()=>{
            this.myChart.resize();
        });
    }

    /***
     * 随机获取颜色
     */

    static getRandomColor() {
        return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }

    destroy(){
        this.$el.innerHTML = "";
        this.$el.setAttribute("_echarts_instance_", "");
    }
}
