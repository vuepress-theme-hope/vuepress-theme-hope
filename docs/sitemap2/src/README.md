---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sitemap2
tagline: Sitemap generation for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-sitemap2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-sitemap2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-sitemap2@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { sitemapPlugin } from "vuepress-plugin-sitemap2";

export default {
  plugins: [
    sitemapPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { sitemapPlugin } = require("vuepress-plugin-sitemap2");

module.exports = {
  plugins: [
    sitemapPlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

For details, see [Migration Guide](./migration.md).
