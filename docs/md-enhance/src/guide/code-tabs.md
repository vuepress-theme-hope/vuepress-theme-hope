---
title: Code Tabs
icon: code
---

The plugin provides you code tabs support.

<!-- more -->

## Config

::: code-tabs

@codetab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // adds code tabs support
      codetabs: true,
    }),
  ],
};
```

@codetab JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // adds code tabs support
      codetabs: true,
    }),
  ],
};
```

:::

## Usage

You need to use `code-tabs` container, inside it, place `@codetab` marker with code fence.

If you want a tab be activated by default, you can append a `:active` suffix at the end of marker.

::: note

Only code fence after `@codetab` marker is allowed inside code tabs, other markdown content will be ignored.

:::

## Demo

::: code-tabs

@codetab pnpm

```bash
pnpm add -D vuepress-theme-hope@next
```

@codetab yarn

```bash
yarn add -D vuepress-theme-hope@next
```

@codetab:active npm

```bash
npm i -D vuepress-theme-hope@next
```

:::

````md
::: code-tabs

@codetab pnpm

```bash
pnpm add -D vuepress-theme-hope@next
```

@codetab yarn

```bash
yarn add -D vuepress-theme-hope@next
```

@codetab:active npm

```bash
npm i -D vuepress-theme-hope@next
```

:::
````
