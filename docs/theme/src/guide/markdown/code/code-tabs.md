---
title: Code Tabs
icon: code
order: 2
category:
  - Markdown
tag:
  - Code Tabs
  - Markdown
---

The theme provides you code tabs support.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    codeTabs: true,
  },
});
```

## Usage

This is the same as [tabs feature](../content/tabs.md), but it's special built for code blocks.

Only the first code fence after `@tab` marker is rendered inside code tabs, other Markdown content will be ignored.

## Demo

:::: md-demo

Install VuePress:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress
```

@tab yarn

```bash
yarn add -D vuepress
```

@tab:active npm

```bash
npm i -D vuepress
```

:::

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

::::
