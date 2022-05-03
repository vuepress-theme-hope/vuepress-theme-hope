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

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-seo2@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-seo2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-seo2@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

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

:::

::: code-group-item JS

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

::::
