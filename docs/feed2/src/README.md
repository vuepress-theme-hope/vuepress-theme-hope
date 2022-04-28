---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-feed2
tagline: Feed plugin for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

## How to use

### Install

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-feed2@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-feed2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-feed2@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { feedPlugin } from "vuepress-plugin-feed2";

export default {
  plugins: [
    feedPlugin({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { feedPlugin } = require("vuepress-plugin-feed2");

module.exports = {
  plugins: [
    feedPlugin({
      // your options
    }),
  ],
};
```

:::

::::

## Migrating from V1

For details, see [Migration Guide](./migration.md).
