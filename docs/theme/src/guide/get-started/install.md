---
title: Install / Usage
icon: install
category:
  - Get Started
tag:
  - Get Started
  - Install
  - Usage
---

## Install

Create a vuepress-theme-hope project in `[dir]` folder under the current project:

:::: code-group

<!-- ::: code-group-item yarn

```bash
yarn create vuepress-theme-hope [dir]
```

::: -->

::: code-group-item npm

```bash
npm init vuepress-theme-hope@next [dir]
```

:::

::::

::: note

`[dir]` is a parameter here, place it with real folder names, such as `docs`, `src` or other name you like.

:::

## Usage

Please import and use `defineHopeConfig` in the config file to use `vuepress-theme-hope`.

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  // your config here
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  // your config here
});
```

:::

::::

You can view [Config of this site][docs-config] as an example.

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts
