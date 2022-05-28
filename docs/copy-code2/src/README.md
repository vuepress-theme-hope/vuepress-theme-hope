---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code2
tagline: Code Copy plugin for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-copy-code2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-copy-code2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-copy-code2@next
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
const { copyCodePlugin } = require("vuepress-plugin-copy-code2");

module.exports = {
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
