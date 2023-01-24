---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-search-pro
tagline: Powerful client search plugin for VuePress2
actions:
  - text: Guide 💡
    link: /guide.html
    type: primary

  - text: Config 🛠
    link: /config.html

footer: MIT Licensed | Copyright © 2022-present Mr.Hope
copyrightText: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-search-pro
```

@tab yarn

```bash
yarn add -D vuepress-plugin-search-pro
```

@tab npm

```bash
npm i -D vuepress-plugin-search-pro
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    ssearchProPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // your options
    }),
  ],
};
```

:::

<NetlifyBadge />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
