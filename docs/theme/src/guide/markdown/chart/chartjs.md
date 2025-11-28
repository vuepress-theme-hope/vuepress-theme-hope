---
title: Chart.js
icon: chart-simple
category:
  - Markdown
tag:
  - Chart
  - Markdown
---

Add [chart.js][] support to the Markdown files in your VuePress site.

[chart.js]: https://www.chartjs.org/docs/latest/

<!-- more -->

## Settings

Install [chart.js][] in your project:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D chart.js
```

@tab yarn

```bash
yarn add -D chart.js
```

@tab npm

```bash
npm i -D chart.js
```

:::

Then enabling via:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    chartjs: true,
  },
});
```

## Syntax

````md
::: chartjs Title

```json
{
  // Your chart config here.
}
```

:::
````

You should use `json` code block to provide your Chart.js configuration whenever possible, however for dynamic data generation, you can also use script blocks. Both `js` and `javascript` code blocks are also supported. You should assign your export object to `module.exports`.

::: warning

For security reasons, you need to manually allow script blocks in certain files. Set `markdown.DANGEROUS_ALLOW_SCRIPT_EXECUTION: true` and `markdown.DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST: ['your/file/path.md']` in theme options.

:::

## Demo

:::: preview Bar Chart

::: chartjs A bar chart

```json
{
  "type": "bar",
  "data": {
    "labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    "datasets": [
      {
        "label": "# of Votes",
        "data": [12, 19, 3, 5, 2, 3],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {
    "scales": {
      "y": {
        "beginAtZero": true
      }
    }
  }
}
```

:::

::::

:::: preview Bubble Chart

::: chartjs A Bubble Chart

```json
{
  "type": "bubble",
  "data": {
    "datasets": [
      {
        "label": "First Dataset",
        "data": [
          { "x": 20, "y": 30, "r": 15 },
          { "x": 40, "y": 10, "r": 10 }
        ],
        "backgroundColor": "rgb(255, 99, 132)"
      }
    ]
  }
}
```

:::

::::

:::: preview Line Chart

::: chartjs A Line Chart

```json
{
  "type": "line",
  "data": {
    "labels": ["January", "February", "March", "April", "May", "June", "July"],
    "datasets": [
      {
        "label": "My First Dataset",
        "data": [65, 59, 80, 81, 56, 55, 40],
        "fill": false,
        "borderColor": "rgb(75, 192, 192)",
        "tension": 0.1
      }
    ]
  }
}
```

:::

::::

:::: preview Polar Area Chart

::: chartjs A Polar Area Chart

```json
{
  "type": "polarArea",
  "data": {
    "labels": ["Red", "Green", "Yellow", "Grey", "Blue"],
    "datasets": [
      {
        "label": "My First Dataset",
        "data": [11, 16, 7, 3, 14],
        "backgroundColor": [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
          "rgb(54, 162, 235)"
        ]
      }
    ]
  }
}
```

:::

::::

:::: preview Radar Chart

::: chartjs A Radar Chart

```json
{
  "type": "radar",
  "data": {
    "labels": [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running"
    ],
    "datasets": [
      {
        "label": "My First Dataset",
        "data": [65, 59, 90, 81, 56, 55, 40],
        "fill": true,
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgb(255, 99, 132)",
        "pointBackgroundColor": "rgb(255, 99, 132)",
        "pointBorderColor": "#fff",
        "pointHoverBackgroundColor": "#fff",
        "pointHoverBorderColor": "rgb(255, 99, 132)"
      },
      {
        "label": "My Second Dataset",
        "data": [28, 48, 40, 19, 96, 27, 100],
        "fill": true,
        "backgroundColor": "rgba(54, 162, 235, 0.2)",
        "borderColor": "rgb(54, 162, 235)",
        "pointBackgroundColor": "rgb(54, 162, 235)",
        "pointBorderColor": "#fff",
        "pointHoverBackgroundColor": "#fff",
        "pointHoverBorderColor": "rgb(54, 162, 235)"
      }
    ]
  },
  "options": {
    "elements": {
      "line": {
        "borderWidth": 3
      }
    }
  }
}
```

:::

::::

:::: preview Scatter Chart

::: chartjs A Scatter Chart

```json
{
  "type": "scatter",
  "data": {
    "datasets": [
      {
        "label": "Scatter Dataset",
        "data": [
          { "x": -10, "y": 0 },
          { "x": 0, "y": 10 },
          { "x": 10, "y": 5 },
          { "x": 0.5, "y": 5.5 }
        ],
        "backgroundColor": "rgb(255, 99, 132)"
      }
    ]
  },
  "options": {
    "scales": {
      "x": {
        "type": "linear",
        "position": "bottom"
      }
    }
  }
}
```

:::

::::

## Docs

For details, please see [Chart.js Docs](https://www.chartjs.org/docs/latest/).
