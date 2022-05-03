---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-photo-swipe
tagline: Photo swipe plugin for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
---

Let your images support preview, zoom, share, swipe view and download.

## How to use

### Install

:::: code-group

::: code-group-item pnpm

```bash
pnpm add -D vuepress-plugin-photo-swipe@next
```

:::

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-photo-swipe@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-photo-swipe@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { photoSwipePlugin } from "vuepress-plugin-photo-swipe";

export default {
  plugins: [
    photoSwipePlugin({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { photoSwipePlugin } = require("vuepress-plugin-photo-swipe");

module.exports = {
  plugins: [
    photoSwipePlugin({
      // your options
    }),
  ],
};
```

:::

::::
