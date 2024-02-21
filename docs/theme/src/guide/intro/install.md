---
title: Install / Usage
icon: download
order: 2
category:
  - Get Started
tag:
  - Get Started
  - Install
  - Usage
---

## Requirement

- Env: LTS Versions of Node.js (18, 20)
- Package Manager: npm >= 8, yarn >= 2, pnpm >= 7
- A VuePress2 project with Vue3

## Install

Create a new vuepress-theme-hope project in `[dir]` folder:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@latest [dir]
```

:::

To add vuepress-theme-hope as docs builder to an existing project, run the following command in the project root directory:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope add [dir]
```

@tab yarn

```bash
yarn create vuepress-theme-hope add [dir]
```

@tab npm

```bash
npm init vuepress-theme-hope@latest add [dir]
```

:::

::: important

`[dir]` is a parameter here, replace it with real folder names, such as `docs`, `blog` or other name you like.

:::

## Usage and Configuration

Please import and use `hopeTheme` to use `vuepress-theme-hope`, the first argument accepted by `hopeTheme` will be used as the theme config:

::: code-tabs#language

@tab TS

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // your theme config here
  }),
});
```

@tab JS

```js {7} title=".vuepress/config.js"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // your theme config here
  }),
};
```

:::

You can view [Config of this site][docs-config] as an example.

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts
