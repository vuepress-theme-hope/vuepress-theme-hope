---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-comment2
tagline: Comment and pageview plugin for VuePress2
actions:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-comment2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-comment2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-comment2@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { commentPlugin } from "vuepress-plugin-comment2";

export default {
  plugins: [
    commentPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { commentPlugin } = require("vuepress-plugin-comment2");

module.exports = {
  plugins: [
    commentPlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

See [Migration Guide](./migration.md).
