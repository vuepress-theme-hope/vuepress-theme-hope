---
title: 配置介绍
icon: gears
order: 1
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

在 VuePress 中，有三种配置概念:

- 站点配置: 这是你在 [配置文件][config] 中直接导出的对象
- 主题配置: 传递给 `hopeTheme` 的第一个对象
- 页面配置: 由在页面顶部基于 YAML 语法的 Frontmatter 提供

## 使用主题

```ts twoslash title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // 站点选项
  // ...

  theme: hopeTheme(
    {
      // 主题选项
      // ...
    },
    {
      // 主题行为选项 (可选)
    },
  ),
});
```

[config]: https://vuejs.press/zh/guide/configuration.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6
