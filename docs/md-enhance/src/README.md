---
home: true
title: Home
icon: home
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-md-enhance
tagline: Enhancement for Markdown in VuePress
actions:
  - text: Guide
    icon: lightbulb
    link: ./guide/
    type: primary

  - text: Config
    icon: tools
    link: ./config.html

highlights:
  - header: Inserting Charts
    image: /assets/image/chart.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: Chart Support
        icon: chart-simple
        details: Display charts in Markdown
        link: ./guide/chart/chartjs.html

      - title: ECharts Support
        icon: bar-chart
        details: Display ECharts in Markdown
        link: ./guide/chart/echarts.html

      - title: Flowchart Support
        icon: route
        details: Create your flowchart in Markdown
        link: ./guide/chart/flowchart.html

      - title: Markmap Support
        icon: fab fa-markdown
        details: Generate mindmap with Markdown
        link: ./guide/chart/markmap.html

      - title: Mermaid Support
        icon: chart-pie
        details: Add mermaid diagram in Markdown
        link: ./guide/chart/mermaid.html

      - title: Plantuml Support
        icon: diagram-project
        details: Add plantuml diagram in Markdown
        link: ./guide/chart/plantuml.html

  - header: Showing your codes and works
    image: /assets/image/code.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: Code Demo Support
        icon: laptop-code
        details: You can insert code demo easily
        link: ./guide/code/demo/

      - title: Playground Support
        icon: code
        details: You can add playground in Markdown files
        link: ./guide/code/playground.html

      - title: Kotlin playground Support
        icon: fab fa-kickstarter
        details: Reactive kotlin playground
        link: ./guide/code/kotlin-playground.html

      - title: Vue playground Support
        icon: fab fa-vuejs
        details: Show living vue component in playground
        link: ./guide/code/vue-playground.html

      - title: Sandpack playground Support
        icon: code
        details: A live coding environment driven by Sandpack.
        link: ./guide/code/sandpack.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab npm

```bash
npm i -D vuepress-plugin-md-enhance
```

:::

## Usage

::: code-tabs#language

@tab TS

```ts title=".vuepress/config.ts"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

For details, see [Migration Guide](./migration.md).
