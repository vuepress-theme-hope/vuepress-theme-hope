---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-seo2
tagline: Full SEO enhance of your site
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
pnpm add -D vuepress-plugin-seo2@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-seo2@next
```

@tab npm

```bash
npm i -D vuepress-plugin-seo2@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { seoPlugin } from "vuepress-plugin-seo2";

export default {
  plugins: [
    seoPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { seoPlugin } = require("vuepress-plugin-seo2");

module.exports = {
  plugins: [
    seoPlugin({
      // your options
    }),
  ],
};
```

:::

## Migrating from V1

For details, see [Migration Guide](./migration.md).
