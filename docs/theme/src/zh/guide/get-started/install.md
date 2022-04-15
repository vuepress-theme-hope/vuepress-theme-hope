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

::: note

这里的 `[dir]` 是一个参数，你需要使用真实的文件夹名称替换它，例如 `docs`、`src` 或其他你喜欢的名称。

:::

## 使用

请在配置文件中导入并使用 `defineHopeConfig` 以使用 `vuepress-theme-hope`。

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  // 此处放置配置
});
```

:::

::: code-group-item JS

```js
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
