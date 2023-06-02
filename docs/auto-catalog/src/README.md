---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-auto-catalog
tagline: Generate Catalog pages for VuePress2
actions:
  - text: Guide 💡
    link: ./guide.html
    type: primary

  - text: Config 🛠
    link: ./config.html

features:
  - title: Adding Catalog with one line
    icon: circle-check
    details: Simply add catalog with out-of-box AutoCatalog component

  - title: Generate catalog page automatically
    icon: file
    details: Generate catalog page for every dir

footer: Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope

copyright: false
---

## How to use

### Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-auto-catalog
```

@tab yarn

```bash
yarn add -D vuepress-plugin-auto-catalog
```

@tab npm

```bash
npm i -D vuepress-plugin-auto-catalog
```

:::

### Usage

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      // your options
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      // your options
    }),
  ],
};
```

:::
