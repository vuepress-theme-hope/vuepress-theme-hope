---
title: ECharts
icon: chart-simple
---

<!-- #region before -->

让你 VuePress 站点中的 Markdown 文件支持图表。

<!-- more -->

## 配置

在你的项目中安装 [ECharts](https://echarts.apache.org/zh/index.html):

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

之后启用它:

<!-- #endregion before -->

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用 ECharts 图表
      echarts: true,
    }),
  ],
};
```

<!-- #region after -->

## 格式

### 使用 JSON

如果你可以很轻松的生成数据，你可以直接通过一个 JSON 代码块来提供 ECharts 配置:

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

我们将通过 `myChart` 变量暴露 ECharts 实例，并且你应该将 Echart 配置赋值给 `option` 变量。同时，你也可以赋值 `width` 和 `height` 来设置图表大小。

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

## 高级

你可以在[客户端配置文件][client-config]中导入并使用 `defineEChartsConfig` 来自定义 ECharts:

```ts title=".vuepress/client.ts"
import { defineEChartsConfig } from "vuepress-plugin-md-enhance/client";

defineEChartsConfig({
  options: {
    // 全局 ECharts 配置
  },
  setup: async () => {
    // ECharts 设置
    // 例如: await import("echarts-wordcloud")
  },
});
```

## 文档

相关详情，详见 [ECharts 文档](https://echarts.apache.org/handbook/zh/get-started/).

## 案例

:::: md-demo 线图

<!-- @include: @echarts/line.snippet.md -->

::::

:::: md-demo 柱状图

<!-- @include: @echarts/bar.snippet.md -->

::::

:::: md-demo 饼图

<!-- @include: @echarts/pie.snippet.md -->

::::

:::: md-demo 散点图

<!-- @include: @echarts/scatter.snippet.md -->

::::

:::: md-demo 极坐标图

<!-- @include: @echarts/polar.snippet.md -->

::::

:::: md-demo 烛台图

<!-- @include: @echarts/candlestick.snippet.md -->

::::

:::: md-demo 雷达图

<!-- @include: @echarts/radar.snippet.md -->

::::

:::: md-demo 热力图

<!-- @include: @echarts/heat-map.snippet.md -->

::::

:::: md-demo 树图

<!-- @include: @echarts/tree.snippet.md -->

::::

:::: md-demo 多图

<!-- @include: @echarts/multiple.snippet.md -->

::::

:::: md-demo 词云 (通过设置函数)

<!-- @include: @echarts/wordcloud.snippet.md -->

::::

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6

<!-- #endregion after -->
