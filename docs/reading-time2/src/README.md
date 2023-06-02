---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-reading-time2
tagline: Expect reading time and word count statistics
actions:
  - text: Guide 💡
    link: ./guide.html
    type: primary

  - text: Config 🛠
    link: ./config.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-reading-time2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-reading-time2
```

@tab npm

```bash
npm i -D vuepress-plugin-reading-time2
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTimePlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { readingTimePlugin } from "vuepress-plugin-reading-time2";

export default {
  plugins: [
    readingTimePlugin({
      // your options
    }),
  ],
};
```

:::
