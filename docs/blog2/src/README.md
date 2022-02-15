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

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-blog2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-blog2@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { blog } from "vuepress-plugin-blog2";

export default {
  plugins: [
    blog({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { blog } = require("vuepress-plugin-blog2");

module.exports = {
  plugins: [
    blog({
      // your options
    }),
  ],
};
```

:::

::::

## Migrating from V1

This plugin wasn’t released in V1.
