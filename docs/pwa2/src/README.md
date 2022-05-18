---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-pwa2
tagline: Turning on Progressive Web App Support
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
pnpm add -D vuepress-plugin-pwa2@next
```

:::

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
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default {
  plugins: [
    pwaPlugin({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { pwaPlugin } = require("vuepress-plugin-pwa2");

module.exports = {
  plugins: [
    pwaPlugin({
      // your options
    }),
  ],
};
```

:::

::::

::: tip

If you are using this plugin, we recommend you to set `shouldPrefetch: false` in your VuePress config file.

:::
