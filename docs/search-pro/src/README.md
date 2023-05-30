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

features:
  - title: High Performance
    icon: rocket
    details: High speed searching in a separated worker powered by <a href="https://mister-hope.github.io/slimsearch/" _target="_blank">slimsearch</a>

  - title: Full Indexing
    icon: file-zipper
    details: Indexing all contents in your site

  - title: Highlight and Context
    icon: highlighter
    details: Highlight keywords and show related context in search result

  - title: Auto Suggest
    icon: lightbulb
    details: Get query suggestions while typing

  - title: Custom Fields
    icon: gears
    details: Adding data to index with options

  - title: Search History
    icon: clock
    details: Preserve history of queries and results

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
    searchProPlugin({
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
