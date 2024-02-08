---
title: ECharts
---

## Demo

### Line Chart

::: echarts A line chart

```json
{
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "data": [820, 932, 901, 934, 1290, 1330, 1320],
      "type": "line",
      "smooth": true
    }
  ]
}
```

:::

::: echarts A line chart

```js
const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
};
```

:::

::: echarts Dynamic Data & Time Axis

```js
const oneDay = 86400000;
const data = [];
let now = new Date(1997, 9, 3);
let value = Math.random() * 1000;

const randomData = () => {
  now = new Date(+now + oneDay);
  value = value + Math.random() * 21 - 10;
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
      Math.round(value),
    ],
  };
};

for (let i = 0; i < 1000; i++) data.push(randomData());

const option = {
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " : " +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: "time",
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
    splitLine: {
      show: false,
    },
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true,
      },
      dataView: {
        show: true,
        readOnly: false,
      },
      restore: {
        show: true,
      },
      saveAsImage: {
        show: true,
      },
    },
  },
  series: [
    {
      name: "Fake Data",
      type: "line",
      showSymbol: false,
      data: data,
    },
  ],
};
const timeId = setInterval(() => {
  if (myChart._disposed) return clearInterval(timeId);

  for (let i = 0; i < 5; i++) {
    data.shift();
    data.push(randomData());
  }
  myChart.setOption({
    series: [
      {
        data: data,
      },
    ],
  });
}, 1000);
```

:::

### Bar Chart

::: echarts A bar chart

```js
const data = [];

for (let i = 0; i < 5; i++) data.push(Math.round(Math.random() * 200));

const option = {
  xAxis: {
    max: "dataMax",
  },
  yAxis: {
    type: "category",
    data: ["A", "B", "C", "D", "E"],
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 2, // only the largest 3 bars will be displayed
  },
  series: [
    {
      realtimeSort: true,
      name: "X",
      type: "bar",
      data: data,
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
      },
    },
  ],
  legend: {
    show: true,
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true,
      },
      dataView: {
        show: true,
        readOnly: false,
      },
      restore: {
        show: true,
      },
      saveAsImage: {
        show: true,
      },
    },
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
};
const run = () => {
  for (let i = 0; i < data.length; i++)
    data[i] += Math.round(Math.random() * Math.random() > 0.9 ? 2000 : 200);

  myChart.setOption({
    series: [{ type: "bar", data }],
  });
};
const timeId = setInterval(() => {
  if (myChart._disposed) return clearInterval(timeId);

  run();
}, 3000);
```

:::

### Pie Chart

::: echarts A nightingale chart

```json
{
  "legend": {
    "top": "bottom"
  },
  "toolbox": {
    "show": true,
    "feature": {
      "mark": {
        "show": true
      },
      "dataView": {
        "show": true,
        "readOnly": false
      },
      "restore": {
        "show": true
      },
      "saveAsImage": {
        "show": true
      }
    }
  },
  "series": [
    {
      "name": "Nightingale Chart",
      "type": "pie",
      "radius": [20, 100],
      "center": ["50%", "50%"],
      "roseType": "area",
      "itemStyle": {
        "borderRadius": 8
      },
      "data": [
        {
          "value": 40,
          "name": "rose 1"
        },
        {
          "value": 38,
          "name": "rose 2"
        },
        {
          "value": 32,
          "name": "rose 3"
        },
        {
          "value": 30,
          "name": "rose 4"
        },
        {
          "value": 28,
          "name": "rose 5"
        },
        {
          "value": 26,
          "name": "rose 6"
        },
        {
          "value": 22,
          "name": "rose 7"
        },
        {
          "value": 18,
          "name": "rose 8"
        }
      ]
    }
  ]
}
```

:::

### Scatter Chart

::: echarts A scatter chart

```json
{
  "xAxis": {},
  "yAxis": {},
  "series": [
    {
      "symbolSize": 20,
      "data": [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68]
      ],
      "type": "scatter"
    }
  ]
}
```

:::

### Polar Chart

::: echarts Two Value-Axes in Polar

```js
const data = [];

for (let i = 0; i <= 100; i++) {
  let theta = (i / 100) * 360;
  let r = 5 * (1 + Math.sin((theta / 180) * Math.PI));
  data.push([r, theta]);
}

const height = 450;

const option = {
  legend: {
    data: ["line"],
  },
  polar: {},
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
  },
  angleAxis: {
    type: "value",
    startAngle: 0,
  },
  radiusAxis: {},
  series: [
    {
      coordinateSystem: "polar",
      name: "line",
      type: "line",
      data: data,
    },
  ],
};
```

:::

### Candlestick Chart

::: echarts

```js
const upColor = "#ec0000";
const upBorderColor = "#8A0000";
const downColor = "#00da3c";
const downBorderColor = "#008F28";
// Each item: open，close，lowest，highest
const data0 = splitData([
  ["2013/1/24", 2320.26, 2320.26, 2287.3, 2362.94],
  ["2013/1/25", 2300, 2291.3, 2288.26, 2308.38],
  ["2013/1/28", 2295.35, 2346.5, 2295.35, 2346.92],
  ["2013/1/29", 2347.22, 2358.98, 2337.35, 2363.8],
  ["2013/1/30", 2360.75, 2382.48, 2347.89, 2383.76],
  ["2013/1/31", 2383.43, 2385.42, 2371.23, 2391.82],
  ["2013/2/1", 2377.41, 2419.02, 2369.57, 2421.15],
  ["2013/2/4", 2425.92, 2428.15, 2417.58, 2440.38],
  ["2013/2/5", 2411, 2433.13, 2403.3, 2437.42],
  ["2013/2/6", 2432.68, 2434.48, 2427.7, 2441.73],
  ["2013/2/7", 2430.69, 2418.53, 2394.22, 2433.89],
  ["2013/2/8", 2416.62, 2432.4, 2414.4, 2443.03],
  ["2013/2/18", 2441.91, 2421.56, 2415.43, 2444.8],
  ["2013/2/19", 2420.26, 2382.91, 2373.53, 2427.07],
  ["2013/2/20", 2383.49, 2397.18, 2370.61, 2397.94],
  ["2013/2/21", 2378.82, 2325.95, 2309.17, 2378.82],
  ["2013/2/22", 2322.94, 2314.16, 2308.76, 2330.88],
  ["2013/2/25", 2320.62, 2325.82, 2315.01, 2338.78],
  ["2013/2/26", 2313.74, 2293.34, 2289.89, 2340.71],
  ["2013/2/27", 2297.77, 2313.22, 2292.03, 2324.63],
  ["2013/2/28", 2322.32, 2365.59, 2308.92, 2366.16],
  ["2013/3/1", 2364.54, 2359.51, 2330.86, 2369.65],
  ["2013/3/4", 2332.08, 2273.4, 2259.25, 2333.54],
  ["2013/3/5", 2274.81, 2326.31, 2270.1, 2328.14],
  ["2013/3/6", 2333.61, 2347.18, 2321.6, 2351.44],
  ["2013/3/7", 2340.44, 2324.29, 2304.27, 2352.02],
  ["2013/3/8", 2326.42, 2318.61, 2314.59, 2333.67],
  ["2013/3/11", 2314.68, 2310.59, 2296.58, 2320.96],
  ["2013/3/12", 2309.16, 2286.6, 2264.83, 2333.29],
  ["2013/3/13", 2282.17, 2263.97, 2253.25, 2286.33],
  ["2013/3/14", 2255.77, 2270.28, 2253.31, 2276.22],
  ["2013/3/15", 2269.31, 2278.4, 2250, 2312.08],
  ["2013/3/18", 2267.29, 2240.02, 2239.21, 2276.05],
  ["2013/3/19", 2244.26, 2257.43, 2232.02, 2261.31],
  ["2013/3/20", 2257.74, 2317.37, 2257.42, 2317.86],
  ["2013/3/21", 2318.21, 2324.24, 2311.6, 2330.81],
  ["2013/3/22", 2321.4, 2328.28, 2314.97, 2332],
  ["2013/3/25", 2334.74, 2326.72, 2319.91, 2344.89],
  ["2013/3/26", 2318.58, 2297.67, 2281.12, 2319.99],
  ["2013/3/27", 2299.38, 2301.26, 2289, 2323.48],
  ["2013/3/28", 2273.55, 2236.3, 2232.91, 2273.55],
  ["2013/3/29", 2238.49, 2236.62, 2228.81, 2246.87],
  ["2013/4/1", 2229.46, 2234.4, 2227.31, 2243.95],
  ["2013/4/2", 2234.9, 2227.74, 2220.44, 2253.42],
  ["2013/4/3", 2232.69, 2225.29, 2217.25, 2241.34],
  ["2013/4/8", 2196.24, 2211.59, 2180.67, 2212.59],
  ["2013/4/9", 2215.47, 2225.77, 2215.47, 2234.73],
  ["2013/4/10", 2224.93, 2226.13, 2212.56, 2233.04],
  ["2013/4/11", 2236.98, 2219.55, 2217.26, 2242.48],
  ["2013/4/12", 2218.09, 2206.78, 2204.44, 2226.26],
  ["2013/4/15", 2199.91, 2181.94, 2177.39, 2204.99],
  ["2013/4/16", 2169.63, 2194.85, 2165.78, 2196.43],
  ["2013/4/17", 2195.03, 2193.8, 2178.47, 2197.51],
  ["2013/4/18", 2181.82, 2197.6, 2175.44, 2206.03],
  ["2013/4/19", 2201.12, 2244.64, 2200.58, 2250.11],
  ["2013/4/22", 2236.4, 2242.17, 2232.26, 2245.12],
  ["2013/4/23", 2242.62, 2184.54, 2182.81, 2242.62],
  ["2013/4/24", 2187.35, 2218.32, 2184.11, 2226.12],
  ["2013/4/25", 2213.19, 2199.31, 2191.85, 2224.63],
  ["2013/4/26", 2203.89, 2177.91, 2173.86, 2210.58],
  ["2013/5/2", 2170.78, 2174.12, 2161.14, 2179.65],
  ["2013/5/3", 2179.05, 2205.5, 2179.05, 2222.81],
  ["2013/5/6", 2212.5, 2231.17, 2212.5, 2236.07],
  ["2013/5/7", 2227.86, 2235.57, 2219.44, 2240.26],
  ["2013/5/8", 2242.39, 2246.3, 2235.42, 2255.21],
  ["2013/5/9", 2246.96, 2232.97, 2221.38, 2247.86],
  ["2013/5/10", 2228.82, 2246.83, 2225.81, 2247.67],
  ["2013/5/13", 2247.68, 2241.92, 2231.36, 2250.85],
  ["2013/5/14", 2238.9, 2217.01, 2205.87, 2239.93],
  ["2013/5/15", 2217.09, 2224.8, 2213.58, 2225.19],
  ["2013/5/16", 2221.34, 2251.81, 2210.77, 2252.87],
  ["2013/5/17", 2249.81, 2282.87, 2248.41, 2288.09],
  ["2013/5/20", 2286.33, 2299.99, 2281.9, 2309.39],
  ["2013/5/21", 2297.11, 2305.11, 2290.12, 2305.3],
  ["2013/5/22", 2303.75, 2302.4, 2292.43, 2314.18],
  ["2013/5/23", 2293.81, 2275.67, 2274.1, 2304.95],
  ["2013/5/24", 2281.45, 2288.53, 2270.25, 2292.59],
  ["2013/5/27", 2286.66, 2293.08, 2283.94, 2301.7],
  ["2013/5/28", 2293.4, 2321.32, 2281.47, 2322.1],
  ["2013/5/29", 2323.54, 2324.02, 2321.17, 2334.33],
  ["2013/5/30", 2316.25, 2317.75, 2310.49, 2325.72],
  ["2013/5/31", 2320.74, 2300.59, 2299.37, 2325.53],
  ["2013/6/3", 2300.21, 2299.25, 2294.11, 2313.43],
  ["2013/6/4", 2297.1, 2272.42, 2264.76, 2297.1],
  ["2013/6/5", 2270.71, 2270.93, 2260.87, 2276.86],
  ["2013/6/6", 2264.43, 2242.11, 2240.07, 2266.69],
  ["2013/6/7", 2242.26, 2210.9, 2205.07, 2250.63],
  ["2013/6/13", 2190.1, 2148.35, 2126.22, 2190.1],
]);
function splitData(rawData) {
  const categoryData = [];
  const values = [];

  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }

  return {
    categoryData: categoryData,
    values: values,
  };
}
const calculateMA = (dayCount) => {
  const result = [];

  for (let i = 0; i < data0.values.length; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    let sum = 0;

    for (let j = 0; j < dayCount; j++) sum += +data0.values[i - j][1];

    result.push(sum / dayCount);
  }

  return result;
};
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
    },
  },
  legend: {
    data: ["日K", "MA5", "MA10", "MA20", "MA30"],
  },
  grid: {
    left: "10%",
    right: "10%",
    bottom: "15%",
  },
  xAxis: {
    type: "category",
    data: data0.categoryData,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    min: "dataMin",
    max: "dataMax",
  },
  yAxis: {
    scale: true,
    splitArea: {
      show: true,
    },
  },
  dataZoom: [
    {
      type: "inside",
      start: 50,
      end: 100,
    },
    {
      show: true,
      type: "slider",
      top: "90%",
      start: 50,
      end: 100,
    },
  ],
  series: [
    {
      name: "日K",
      type: "candlestick",
      data: data0.values,
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upBorderColor,
        borderColor0: downBorderColor,
      },
      markPoint: {
        label: {
          formatter: (param) =>
            param == null ? "" : Math.round(param.value).toString(),
        },
        data: [
          {
            name: "Mark",
            coord: ["2013/5/31", 2300],
            value: 2300,
            itemStyle: {
              color: "rgb(41,60,85)",
            },
          },
          {
            name: "highest value",
            type: "max",
            valueDim: "highest",
          },
          {
            name: "lowest value",
            type: "min",
            valueDim: "lowest",
          },
          {
            name: "average value on close",
            type: "average",
            valueDim: "close",
          },
        ],
        tooltip: {
          formatter: (param) => param.name + "<br>" + (param.data.coord || ""),
        },
      },
      markLine: {
        symbol: ["none", "none"],
        data: [
          [
            {
              name: "from lowest to highest",
              type: "min",
              valueDim: "lowest",
              symbol: "circle",
              symbolSize: 10,
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: false,
                },
              },
            },
            {
              type: "max",
              valueDim: "highest",
              symbol: "circle",
              symbolSize: 10,
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: false,
                },
              },
            },
          ],
          {
            name: "min line on close",
            type: "min",
            valueDim: "close",
          },
          {
            name: "max line on close",
            type: "max",
            valueDim: "close",
          },
        ],
      },
    },
    {
      name: "MA5",
      type: "line",
      data: calculateMA(5),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: "MA10",
      type: "line",
      data: calculateMA(10),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: "MA20",
      type: "line",
      data: calculateMA(20),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
    {
      name: "MA30",
      type: "line",
      data: calculateMA(30),
      smooth: true,
      lineStyle: {
        opacity: 0.5,
      },
    },
  ],
};
```

:::

### Radar Chart

::: echarts

```json
{
  "legend": {
    "data": ["Allocated Budget", "Actual Spending"]
  },
  "radar": {
    "indicator": [
      { "name": "Sales", "max": 6500 },
      { "name": "Administration", "max": 16000 },
      { "name": "Information Technology", "max": 30000 },
      { "name": "Customer Support", "max": 38000 },
      { "name": "Development", "max": 52000 },
      { "name": "Marketing", "max": 25000 }
    ]
  },
  "series": [
    {
      "name": "Budget vs spending",
      "type": "radar",
      "data": [
        {
          "value": [4200, 3000, 20000, 35000, 50000, 18000],
          "name": "Allocated Budget"
        },
        {
          "value": [5000, 14000, 28000, 26000, 42000, 21000],
          "name": "Actual Spending"
        }
      ]
    }
  ]
}
```

:::

### WordCloud

::: echarts

```js
const option = {
  // canvas background color
  backgroundColor: "#ffa",
  // The mouse pointer hangs to display the value
  tooltip: {},
  series: [
    {
      type: "wordCloud",

      // The shape of the "cloud" to draw. Can be any polar equation represented as a
      // callback function, or a keyword present. Available presents are circle (default),
      // cardioid (apple or heart shape curve, the most known polar equation), diamond (
      // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

      shape: "circle",

      // Keep aspect ratio of maskImage or 1:1 for shapes
      // This option is supported since echarts-wordcloud@2.1.0
      keepAspect: false,

      // A silhouette image which the white area will be excluded from drawing texts.
      // The shape option will continue to apply as the shape of the cloud to grow.

      // maskImage: maskImage,

      // Following left/top/width/height/right/bottom are used for positioning the word cloud
      // Default to be put in the center and has 75% x 80% size.

      left: "center",
      top: "center",
      width: "70%",
      height: "80%",
      right: null,
      bottom: null,

      // Text size range which the value in data will be mapped to.
      // Default to have minimum 12px and maximum 60px size.

      sizeRange: [12, 60],

      // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

      rotationRange: [-90, 90],
      rotationStep: 45,

      // size of the grid in pixels for marking the availability of the canvas
      // the larger the grid size, the bigger the gap between words.

      gridSize: 8,

      // set to true to allow word to be drawn partly outside of the canvas.
      // Allow word bigger than the size of the canvas to be drawn
      // This option is supported since echarts-wordcloud@2.1.0
      drawOutOfBound: false,

      // if the font size is too large for the text to be displayed,
      // whether to shrink the text. If it is set to false, the text will
      // not be rendered. If it is set to true, the text will be shrinked.
      // This option is supported since echarts-wordcloud@2.1.0
      shrinkToFit: false,

      // If perform layout animation.
      // NOTE disable it will lead to UI blocking when there is lots of words.
      layoutAnimation: true,

      // Global text style
      textStyle: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        // Color can be a callback function or a color string
        color: function () {
          // Random color
          return (
            "rgb(" +
            [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
            ].join(",") +
            ")"
          );
        },
      },
      emphasis: {
        focus: "self",

        textStyle: {
          textShadowBlur: 10,
          textShadowColor: "#333",
        },
      },

      // Data is an array. Each array item must have name and value property.
      // textStyle must not be empty
      data: [
        {
          name: "vuepress theme hope",
          value: 8888,
          // Style of single text
          //textStyle: {},
        },
        {
          name: "Mr.Hope",
          value: 10000,
          textStyle: {
            color: "black",
          },
          emphasis: {
            textStyle: {
              color: "#BDBEFA",
              shadowBlur: 4,
              shadowOffsetY: 14,
            },
          },
        },
      ],
    },
  ],
};
```

:::

### Multiple Chart

::: echarts

```js
const option = {
  legend: {},
  tooltip: {
    trigger: "axis",
    showContent: false,
  },
  dataset: {
    source: [
      ["product", "2012", "2013", "2014", "2015", "2016", "2017"],
      ["Milk Tea", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
      ["Matcha Latte", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
      ["Cheese Cocoa", 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
      ["Walnut Brownie", 25.2, 37.1, 41.2, 18, 33.9, 49.1],
    ],
  },
  xAxis: { type: "category" },
  yAxis: { gridIndex: 0 },
  grid: { top: "55%" },
  series: [
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "line",
      smooth: true,
      seriesLayoutBy: "row",
      emphasis: { focus: "series" },
    },
    {
      type: "pie",
      id: "pie",
      radius: "30%",
      center: ["50%", "25%"],
      emphasis: {
        focus: "self",
      },
      label: {
        formatter: "{b}: {@2012} ({d}%)",
      },
      encode: {
        itemName: "product",
        value: "2012",
        tooltip: "2012",
      },
    },
  ],
};

const height = 800;
```

:::
