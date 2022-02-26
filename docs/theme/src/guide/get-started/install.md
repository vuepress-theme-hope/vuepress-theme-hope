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

## Usage

:::: code-group

::: code-group-item TS

```ts {2,4,6}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  // your config here
});
```

:::

::: code-group-item JS

```js {2,4,6}
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
