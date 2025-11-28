---
title: ECharts
icon: chart-simple
category:
  - Markdown
tag:
  - ECharts
  - Markdown
---

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

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    echarts: true,
  },
});
```

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

You should use `json` code block to provide your ECharts configuration whenever possible, however for dynamic data generation, you can also use script blocks.

Both `js` or `javascript` code block are supported. We will expose the echarts lib as `echarts` and the instance as `myChart` in the script, and you are expected to assign the echarts option object to `option` variable. Also, you can assign `width` and `height` variable to set the chart size.

::: warning

For security reasons, you need to manually allow script blocks in certain files. Set `markdown.DANGEROUS_ALLOW_SCRIPT_EXECUTION: true` and `markdown.DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST: ['your/file/path.md']` in theme options.

:::

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
