---
title: Code Tabs
icon: code
---

The plugin provides you code tabs support.

<!-- more -->

## Settings

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // adds code tabs support
      codetabs: true,
    }),
  ],
};
```

<!-- region after -->

## Usage

This is the same as [tabs feature](../content/tabs.md), but it's special built for code blocks.

Only code fence after `@tab` marker is allowed inside code tabs, other Markdown content will be ignored.

## Demo

:::: md-demo

Install VuePress Theme Hope:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-theme-hope
```

@tab yarn

```bash
yarn add -D vuepress-theme-hope
```

@tab:active npm

```bash
npm i -D vuepress-theme-hope
```

:::

Install VuePress Plugin Markdown Enhance:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab:active npm

```bash
npm i -D vuepress-plugin-md-enhance
```

:::

::::

<!-- endregion after -->
