---
title: ECharts
icon: chart-simple
---

<!-- #region before -->

Add [echarts][] support to the Markdown files in your VuePress site.

[echarts]: https://echarts.apache.org/en/index.html

<!-- more -->

## Settings

Install [echarts][] in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D echarts
```

@tab yarn

```bash
yarn add -D echarts
```

@tab npm

```bash
npm i -D echarts
```

:::

Then enabling via:

<!-- #endregion before -->

```js {7} title=".vuepress/config.js"
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

<!-- #region after -->

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

We will expose the echarts instance as `echarts` in the script, and you are expected to assign the echarts option object to `option` variable. Also, you can assign `width` and `height` variable to set the chart size.

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

## Advanced

You can import and call `defineEChartsConfig` in [client config file][client-config] to customize echarts.

```ts title=".vuepress/client.ts"
import { defineEChartsConfig } from "vuepress-plugin-md-enhance/client";

defineEChartsConfig({
  options: {
    // global echarts options
  },
  setup: async () => {
    // echarts setup
    // e.g.: await import("echarts-wordcloud")
  },
});
```

## Docs

For details, please see [ECharts Docs](https://echarts.apache.org/handbook/en/get-started/).

## Demo

:::: preview Line Chart

<!-- @include: @echarts/line.snippet.md -->

::::

:::: preview Bar Chart

<!-- @include: @echarts/bar.snippet.md -->

::::

:::: preview Pie Chart

<!-- @include: @echarts/pie.snippet.md -->

::::

:::: preview Scatter Chart

<!-- @include: @echarts/scatter.snippet.md -->

::::

:::: preview Polar Chart

<!-- @include: @echarts/polar.snippet.md -->

::::

:::: preview Candlestick Chart

<!-- @include: @echarts/candlestick.snippet.md -->

::::

:::: preview Radar Chart

<!-- @include: @echarts/radar.snippet.md -->

::::

:::: preview Heat Map

<!-- @include: @echarts/heat-map.snippet.md -->

::::

:::: preview Tree Chart

<!-- @include: @echarts/tree.snippet.md -->

::::

:::: preview Multiple Chart

<!-- @include: @echarts/multiple.snippet.md -->

::::

:::: preview WordCloud (with setup function)

<!-- @include: @echarts/wordcloud.snippet.md -->

::::

[client-config]: https://vuejs.press/guide/configuration.html#client-config-file

<!-- #endregion after -->
