---
title: Markdown Chart Config
icon: fab fa-markdown
order: 4
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options supports different charts in markdown, and can be set **under `markdown` property** in theme options.

<!-- more -->

## markdown.chartjs

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Chart.js](../../guide/markdown/chart/chartjs.md)

Whether to enable Chart.js support

## markdown.echarts

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → ECharts](../../guide/markdown/chart/echarts.md)

Whether to enable ECharts support

## markdown.flowchart

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Flowchart](../../guide/markdown/chart/flowchart.md)

Whether to enable flowchart support

## markdown.mermaid

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Mermaid](../../guide/markdown/chart/mermaid.md)

Whether to enable [Mermaid](https://mermaid.js.org/) support, you can pass in a config object to customize the behavior of Mermaid.

## markdown.plantuml

- Type: `MarkdownItPlantumlOptions[] | boolean`
- Default: `false`
- Details:
  - [Markdown → PlantUML](../../guide/markdown/chart/plantuml.md)

Whether to enable [plantuml](https://plantuml.com/) support.
