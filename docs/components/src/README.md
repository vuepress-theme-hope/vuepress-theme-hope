---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: "@mr-hope/vuepress-plugin-components"
tagline: Components lib plugin for VuePress2
actions:
  - text: Get Started 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## Install

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D @mr-hope/vuepress-plugin-components@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-add-this@next
```

:::

::: code-group-item npm

```bash
npm i -D @mr-hope/vuepress-plugin-components@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { componentsPlugin } from "@mr-hope/vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { componentsPlugin } = require("@mr-hope/vuepress-plugin-components");

module.exports = {
  plugins: [
    componentsPlugin({
      // your options
    }),
  ],
};
```

:::

::::
