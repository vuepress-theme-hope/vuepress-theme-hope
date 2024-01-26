---
title: ECharts
icon: chart-simple
---

Let the Markdown file support chart in your VuePress site.

<!-- more -->

<!-- #region before -->

## Settings

Install [echarts](https://echarts.apache.org/en/index.html) in your project:

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

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
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

```js {8} title=".vuepress/config.js"
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

## Advanced

You can import and call `defineEchartsConfig` in [client config file][client-config] to customize echarts.

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { defineEchartsConfig } from "vuepress-plugin-md-enhance/client";

defineEchartsConfig({
  options: {
    // global echarts options
  },
  setup: async () => {
    // echarts setup
    // e.g.: await import("echarts-wordcloud")
  },
});

export default defineClientConfig({
  // ...
});
```

## Docs

For details, please see [ECharts Docs](https://echarts.apache.org/handbook/en/get-started/).

## Demo

:::: md-demo Line Chart

<!-- @include: @echarts/line.snippet.md -->

::::

:::: md-demo Bar Chart

<!-- @include: @echarts/bar.snippet.md -->

::::

:::: md-demo Pie Chart

<!-- @include: @echarts/pie.snippet.md -->

::::

:::: md-demo Scatter Chart

<!-- @include: @echarts/scatter.snippet.md -->

::::

:::: md-demo Polar Chart

<!-- @include: @echarts/polar.snippet.md -->

::::

:::: md-demo Candlestick Chart

<!-- @include: @echarts/candlestick.snippet.md -->

::::

:::: md-demo Radar Chart

<!-- @include: @echarts/radar.snippet.md -->

::::

:::: md-demo Heat Map

<!-- @include: @echarts/heat-map.snippet.md -->

::::

:::: md-demo Tree Chart

<!-- @include: @echarts/tree.snippet.md -->

::::

:::: md-demo Multiple Chart

<!-- @include: @echarts/multiple.snippet.md -->

::::

:::: md-demo WordCloud (with setup function)

<!-- @include: @echarts/wordcloud.snippet.md -->

::::

[client-config]: https://vuejs.press/guide/configuration.html#client-config-file

<!-- #endregion after -->
