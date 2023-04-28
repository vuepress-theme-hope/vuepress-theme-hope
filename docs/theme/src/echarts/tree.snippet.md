````md
<!-- #region demo -->

::: echarts Tree

```js
const data = await fetch(
  "https://theme-hope-assets.vuejs.press/data/flare.json"
).then((res) => res.json());

const option = {
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
  },
  series: [
    {
      type: "tree",
      data: [data],
      top: "18%",
      bottom: "14%",
      layout: "radial",
      symbol: "emptyCircle",
      symbolSize: 7,
      initialTreeDepth: 3,
      animationDurationUpdate: 750,
      emphasis: {
        focus: "descendant",
      },
    },
  ],
};

const height = 600;
```

:::

<!-- #endregion demo -->
````
