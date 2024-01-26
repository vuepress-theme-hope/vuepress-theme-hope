---
home: true
title: Home
icon: home
heroText: vuepress-plugin-components
tagline: Useful components for VuePress2
actions:
  - text: Guide
    icon: lightbulb
    link: ./guide/
    type: primary

  - text: Config
    icon: tools
    link: ./config.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-components
```

@tab yarn

```bash
yarn add -D vuepress-plugin-components
```

@tab npm

```bash
npm i -D vuepress-plugin-components
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts title=".vuepress/config.ts"
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js title=".vuepress/config.js"
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // your options
    }),
  ],
};
```

:::
