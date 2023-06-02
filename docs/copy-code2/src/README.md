---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code2
tagline: Quick Code Copy Plugin for vuepress
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
pnpm add -D vuepress-plugin-copy-code2
```

@tab yarn

```bash
yarn add -D vuepress-plugin-copy-code2
```

@tab npm

```bash
npm i -D vuepress-plugin-copy-code2
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCodePlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { copyCodePlugin } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCodePlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

See [Migration Guide](./migration.md).
