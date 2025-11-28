---
title: Markdown Chart Config
icon: b:markdown
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

## markdown.markmap

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Markmap](../../guide/markdown/chart/markmap.md)

Whether to enable [Markmap](https://markmap.js.org/) support.

## markdown.mermaid

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Mermaid](../../guide/markdown/chart/mermaid.md)

Whether to enable [Mermaid](https://mermaid.js.org/) support.

## markdown.plantuml

- Type: `MarkdownItPlantumlOptions[] | boolean`
- Default: `false`
- Details:
  - [Markdown → PlantUML](../../guide/markdown/chart/plantuml.md)

Whether to enable [plantuml](https://plantuml.com/) support.

## markdown.DANGEROUS_ALLOW_SCRIPT_EXECUTION

- Type: `boolean`
- Default: `false`

Whether to allow script execution in charts.

## markdown.DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST

- Type: `string[] | '*'`
- Default: `[]`
- Details: Only effective when `DANGEROUS_ALLOW_SCRIPT_EXECUTION` is enabled. A list of file paths allowed to execute chart scripts. Use `'*'` to allow all files.
