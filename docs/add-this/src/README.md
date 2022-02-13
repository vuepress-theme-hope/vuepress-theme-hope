---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-add-this
tagline: AddThis plugin for VuePress2
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

::: code-group-item yarn

```bash
yarn add -D vuepress-plugin-add-this@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-add-this@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { addThis } from "vuepress-plugin-add-this";

export default {
  plugins: [addThis({ pubid: "your pubid" })],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { addThis } = require("vuepress-plugin-add-this");

module.exports = {
  plugins: [addThis({ pubid: "your pubid" })],
};
```

:::

::::

## Migrating from V1

This plugin has not changed from V1.
