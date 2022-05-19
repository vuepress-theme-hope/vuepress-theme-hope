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

::: code-tabs

@codetab pnpm

```bash
pnpm add -D vuepress-plugin-seo2@next
```

@codetab yarn

```bash
yarn add -D vuepress-plugin-seo2@next
```

@codetab npm

```bash
npm i -D vuepress-plugin-seo2@next
```

:::

### Usage

::: code-tabs

@codetab TS

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

@codetab JS

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
