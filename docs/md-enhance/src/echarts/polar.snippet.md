````md
<!-- #region demo -->

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

<!-- #endregion demo -->
````
