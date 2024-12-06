---
title: Markdown Config
icon: fab fa-markdown
order: 2
category:
  - Config
tag:
  - Markdown
  - Plugin Config
  - Theme Config
---

The following options supports different charts in markdown, and can be set **under `markdown` property** in theme options.

### chartjs

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Chart.js](../../guide/markdown/chart/chartjs.md)

Whether to enable Chart.js support

### echarts

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → ECharts](../../guide/markdown/chart/echarts.md)

Whether to enable ECharts support

### flowchart

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Flowchart](../../guide/markdown/chart/flowchart.md)

Whether to enable flowchart support

### mermaid

- Type: `MermaidConfig | boolean`
- Default: `false`
- Details:
  - [Markdown → Mermaid](../../guide/markdown/chart/mermaid.md)

Whether to enable [Mermaid](https://mermaid.js.org/) support, you can pass in a config object to customize the behavior of Mermaid.

### plantuml

- Type: `MarkdownItPlantumlOptions[] | boolean`
- Default: `false`
- Details:
  - [Markdown → PlantUML](../../guide/markdown/chart/plantuml.md)

Whether to enable [plantuml](https://plantuml.com/) support.
