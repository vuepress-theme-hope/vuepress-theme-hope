---
title: Markdown Chart Config
icon: fa7-brands:markdown
order: 4
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options supports different charts in markdown, and can be set **under `markdown` property** in theme options.

<!-- more -->

## Options

::: fields
@`markdown.chartjs` type=boolean

Whether to enable Chart.js support.

See also: [Markdown → Chart.js](../../guide/markdown/chart/chartjs.md).

@`markdown.echarts` type=boolean

Whether to enable ECharts support.

See also: [Markdown → ECharts](../../guide/markdown/chart/echarts.md).

@`markdown.flowchart` type=boolean

Whether to enable flowchart support.

See also: [Markdown → Flowchart](../../guide/markdown/chart/flowchart.md).

@`markdown.markmap` type=boolean

Whether to enable [Markmap](https://markmap.js.org/) support.

See also: [Markdown → Markmap](../../guide/markdown/chart/markmap.md).

@`markdown.mermaid` type=boolean

Whether to enable [Mermaid](https://mermaid.js.org/) support.

See also: [Markdown → Mermaid](../../guide/markdown/chart/mermaid.md).

@`markdown.plantuml` type=`MarkdownItPlantumlOptions[] | boolean`

Whether to enable [plantuml](https://plantuml.com/) support.

See also: [Markdown → PlantUML](../../guide/markdown/chart/plantuml.md).

@`markdown.DANGEROUS_ALLOW_SCRIPT_EXECUTION` type=boolean

Whether to allow script execution in charts.

@`markdown.DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST` type=`string[] | '*'` default=`[]`

Only effective when `DANGEROUS_ALLOW_SCRIPT_EXECUTION` is enabled. A list of file paths allowed to execute chart scripts. Use `'*'` to allow all files.

:::
