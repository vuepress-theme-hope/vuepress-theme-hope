---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-components
tagline: Components lib plugin for VuePress2
actions:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-components@next
```

@tab yarn

```bash
yarn add -D vuepress-plugin-components@next
```

@tab npm

```bash
npm i -D vuepress-plugin-components@next
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
const { componentsPlugin } = require("vuepress-plugin-components");

module.exports = {
  plugins: [
    componentsPlugin({
      // your options
    }),
  ],
};
```

:::
