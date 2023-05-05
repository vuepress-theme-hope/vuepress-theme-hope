---
title: ECharts
icon: chart-simple
category:
  - Markdown
tag:
  - ECharts
  - Markdown
---

让你 VuePress 站点中的 Markdown 文件支持图表。

此插件使用 [ECharts](https://echarts.apache.org/zh/index.html) 提供相应功能。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        echarts: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        echarts: true,
      },
    },
  }),
};
```

:::

## 格式

### 使用 JSON

如果你可以很轻松的生成数据，你可以直接通过一个 JSON 代码块来提供 Echarts 配置:

````md
::: echarts 标题

```json
{
  // 此处为 ECharts 图表配置
}
```

:::
````

### 使用脚本

如果你需要通过脚本来获取数据，你可以使用 `js` 和 `javascript` 的代码块。

我们将通过 `myChart` 变量暴露 Echarts 实例，并且你应该将 Echart 配置赋值给 `option` 变量。同时，你也可以赋值 `width` 和 `height` 来设置图表大小。

````md
::: echarts Title

```js
const option = {
  // 此处为 ECharts 图表配置
};
```

:::
````

::: tip

你可以使用顶级 await 和 `fetch` 来从网络请求中获取数据。

:::

## 文档

相关详情，详见 [ECharts 文档](https://echarts.apache.org/handbook/zh/get-started/).

## 案例

### 线图

<!-- @include: @echarts/line.snippet.md#demo -->

:::: details 代码

<!-- @include: @echarts/line.snippet.md -->

::::

### 柱状图

<!-- @include: @echarts/bar.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/bar.snippet.md -->

::::

### 饼图

<!-- @include: @echarts/pie.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/pie.snippet.md -->

::::

### 散点图

<!-- @include: @echarts/scatter.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/scatter.snippet.md -->

::::

### 极坐标图

<!-- @include: @echarts/polar.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/polar.snippet.md -->

::::

### 烛台图

<!-- @include: @echarts/candlestick.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/candlestick.snippet.md -->

::::

### 雷达图

<!-- @include: @echarts/radar.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/radar.snippet.md -->

::::

### 热力图

<!-- @include: @echarts/heat-map.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/heat-map.snippet.md -->

::::

### 树图

<!-- @include: @echarts/tree.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/tree.snippet.md -->

::::

### 多图

<!-- @include: @echarts/multiple.snippet.md#demo -->

:::: details Code

<!-- @include: @echarts/multiple.snippet.md -->

::::
