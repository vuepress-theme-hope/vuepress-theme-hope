---
title: ECharts
icon: chart-simple
---

Let the Markdown file support chart in your VuePress site.

This plugin is using [echarts](https://echarts.apache.org/en/index.html) to support this feature.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable echarts
      echarts: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable echarts
      echarts: true,
    }),
  ],
};
```

:::

## Syntax

### With JSON

If you can generate your chart data easily, you can just provide echarts config using JSON code block:

````md
::: echarts Title

```json
{
  // Your echarts config here.
}
```

:::
````

### With Scripts

If you need to use script to get the data, you can use `js` or `javascript` code block.

We will expose the echarts instance as `myChart` in the script, and you are expected to assign the echarts option object to `option` variable. Also, you can assign `width` and `height` variable to set the chart size.

````md
::: echarts Title

```js
const option = {
  // Your echarts config here.
};
```

:::
````

::: tip

You can use top-level await and `fetch` to get data from network requests.

:::

## Docs

For details, please see [ECharts Docs](https://echarts.apache.org/handbook/en/get-started/).

## Demo

### Line Chart

<!-- @include: @echarts/line.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/line.snippet.md -->

::::

### Bar Chart

<!-- @include: @echarts/bar.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/bar.snippet.md -->

::::

### Pie Chart

<!-- @include: @echarts/pie.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/pie.snippet.md -->

::::

### Scatter Chart

<!-- @include: @echarts/scatter.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/scatter.snippet.md -->

::::

### Polar Chart

<!-- @include: @echarts/polar.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/polar.snippet.md -->

::::

### Candlestick Chart

<!-- @include: @echarts/candlestick.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/candlestick.snippet.md -->

::::

### Radar Chart

<!-- @include: @echarts/radar.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/radar.snippet.md -->

::::

### Heat Map

<!-- @include: @echarts/heat-map.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/heat-map.snippet.md -->

::::

### Tree Chart

<!-- @include: @echarts/tree.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/tree.snippet.md -->

::::

### Multiple Chart

<!-- @include: @echarts/multiple.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/multiple.snippet.md -->

::::
