---
home: true
title: Home
icon: home
heroText: vuepress-plugin-remove-pwa
tagline: Remove existing service worker from your VuePress site
actions:
  - text: Guide
    icon: lightbulb
    link: ./guide.html
    type: primary

  - text: Config
    icon: tools
    link: ./config.html

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-remove-pwa
```

@tab yarn

```bash
yarn add -D vuepress-plugin-remove-pwa
```

@tab npm

```bash
npm i -D vuepress-plugin-remove-pwa
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { removePWAPlugin } from "vuepress-plugin-remove-pwa";

export default {
  plugins: [
    removePWAPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { removePWAPlugin } from "vuepress-plugin-remove-pwa";

export default {
  plugins: [
    removePWAPlugin({
      // your options
    }),
  ],
};
```

:::
