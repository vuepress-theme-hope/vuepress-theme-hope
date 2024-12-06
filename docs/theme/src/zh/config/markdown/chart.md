---
title: Markdown 图表配置
icon: fab fa-markdown
order: 4
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项支持在 Markdown 中使用不同的图表，可以在主题选项中的 **`markdown` 属性**下设置。

<!-- more -->

## markdown.chartjs

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → Chart.js](../../guide/markdown/chart/chartjs.md)

是否启用 Chart.js 支持

## markdown.echarts

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → ECharts](../../guide/markdown/chart/echarts.md)

是否启用 ECharts 支持

## markdown.flowchart

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → Flowchart](../../guide/markdown/chart/flowchart.md)

是否启用流程图支持

## markdown.mermaid

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → Mermaid](../../guide/markdown/chart/mermaid.md)

是否启用 [Mermaid](https://mermaid.js.org/) 支持，你可以传入一个对象作为 Mermaid 的配置选项。

## markdown.plantuml

- 类型: `MarkdownItPlantumlOptions[] | boolean`
- 默认值: `false`
- 详情:
  - [Markdown → PlantUML](../../guide/markdown/chart/plantuml.md)

是否启用 [plantuml](https://plantuml.com/zh/) 支持。
