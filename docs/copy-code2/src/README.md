---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-copy-code2
tagline: Code Copy plugin for VuePress2
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
yarn add -D vuepress-plugin-copy-code2@next
```

:::

::: code-group-item npm

```bash
npm i -D vuepress-plugin-copy-code2@next
```

:::

::::

### Usage

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { copyCode } from "vuepress-plugin-copy-code2";

export default {
  plugins: [
    copyCode({
      // your options
    }),
  ],
};
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { copyCode } = require("vuepress-plugin-copy-code2");

module.exports = {
  plugins: [
    copyCode({
      // your options
    }),
  ],
};
```

:::

::::

## Migrating from V1

We provide a new `pure` option to add a small button besides language text.

Set this option if you think the default style is too fance.
