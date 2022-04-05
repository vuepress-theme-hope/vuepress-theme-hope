---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-sitemap2
tagline: Sitemap generation for VuePress2
action:
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

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-sitemap2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-sitemap2@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { sitemap } from "vuepress-plugin-sitemap2";

export default {
  plugins: [
    sitemap({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { sitemap } = require("vuepress-plugin-sitemap2");

module.exports = {
  plugins: [
    sitemap({
      // your options
    }),
  ],
};
```

:::

::::
