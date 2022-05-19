---
title: Code Tabs
icon: code
index: 3
category:
  - Markdown
tag:
  - Code Tabs
  - Markdown
---

The theme provides you you code tabs support.

<!-- more -->

## Config

::: code-tabs

@codetab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        codetabs: true,
      },
    },
  }),
});
```

@codetab JS

```js {7-9}
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        codetabs: true,
      },
    },
  }),
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
