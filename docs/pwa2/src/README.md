---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: A powerfull PWA plugin
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

This plugin will turn on Progressive Web App Support.

## How to use

### Install

:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-pwa2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-pwa2@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { pwa } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwa({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { pwa } = require("vuepress-plugin-pwa2");

module.exports = {
  plugins: [
    pwa({
      // your options
    }),
  ],
};
```

:::

::::
