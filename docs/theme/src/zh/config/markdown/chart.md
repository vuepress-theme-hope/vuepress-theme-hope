---
title: Markdown 图表配置
icon: fa7-brands:markdown
order: 4
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项支持在 Markdown 中使用不同的图表，可以在主题选项中的 **`markdown` 属性**下设置。

<!-- more -->

## 选项 {#options}

::: fields
@`markdown.chartjs` type=boolean

是否启用 Chart.js 支持。

参考：[Markdown → Chart.js](../../guide/markdown/chart/chartjs.md)。

@`markdown.echarts` type=boolean

是否启用 ECharts 支持。

参考：[Markdown → ECharts](../../guide/markdown/chart/echarts.md)。

@`markdown.flowchart` type=boolean

是否启用流程图支持。

参考：[Markdown → Flowchart](../../guide/markdown/chart/flowchart.md)。

@`markdown.markmap` type=boolean

是否启用 [Markmap](https://markmap.js.org/) 支持。

参考：[Markdown → Markmap](../../guide/markdown/chart/markmap.md)。

@`markdown.mermaid` type=boolean

是否启用 [Mermaid](https://mermaid.js.org/) 支持。

参考：[Markdown → Mermaid](../../guide/markdown/chart/mermaid.md)。

@`markdown.plantuml` type=`MarkdownItPlantumlOptions[] | boolean`

是否启用 [plantuml](https://plantuml.com/zh/) 支持。

参考：[Markdown → PlantUML](../../guide/markdown/chart/plantuml.md)。

@`markdown.DANGEROUS_ALLOW_SCRIPT_EXECUTION` type=boolean

是否允许在图表中执行脚本。这可能会带来安全风险，请谨慎使用。

@`markdown.DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST` type=`string[] | '*'` default=`[]`

当启用脚本执行时，允许执行图表脚本的文件路径列表。使用 `'*'` 允许所有文件。

:::
