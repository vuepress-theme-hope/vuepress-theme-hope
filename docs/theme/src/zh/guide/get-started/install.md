---
title: 安装/使用
icon: install
category:
  - 快速上手
tag:
  - 快速上手
  - 安装
  - 使用
---

## 安装

在当前项目的 `[dir]` 文件夹内创建 vuepress-theme-hope 项目:

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

## 使用

:::: code-group

::: code-group-item TS

```ts {2,4,6}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  // 此处放置配置
});
```

:::

::: code-group-item JS

```js {2,4,6}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  // 此处放置配置
});
```

:::

::::

你可以查看 [本文档配置][docs-config] 作为一个配置参考。

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/docs/theme/src/.vuepress/config.ts
