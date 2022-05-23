---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-blog2
tagline: Blog plugin for VuePress2
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
pnpm add -D vuepress-plugin-blog2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-blog2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-blog2@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  plugins: [
    blogPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { blogPlugin } = require("vuepress-plugin-blog2");

module.exports = {
  plugins: [
    blogPlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

This plugin wasn’t released in V1.
