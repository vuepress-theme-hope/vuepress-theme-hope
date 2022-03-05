---
title: 配置介绍
icon: config
category:
  - 配置
tag:
  - 介绍
---

## 配置概念

VuePress 主要通过目录下的 `.vuepress/` 文件夹存放配置和需要的文件。

::: info

关于 VuePress 的文件结构，详见 [VuePress 基础 → 文件结构](../cookbook/vuepress/file.md)。

:::

在 VuePress 中，有三种配置概念：

- 站点配置: 这是你在配置文件中直接导出的对象
- 主题配置: 配置文件中的 `themeConfig` 对象
- 页面配置: 由在页面顶部基于 YAML 语法的 Frontmatter 提供

## 使用主题

:::: code-group

::: code-group-item TS

```ts {2,4,6,8,9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  // 此处放置配置
  themeConfig: {
    // 此处放置主题配置
  },
});
```

:::

::: code-group-item JS

```js {2,4,6,8,9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  // 此处放置配置
  themeConfig: {
    // 此处放置主题配置
  },
});
```

:::

::::
