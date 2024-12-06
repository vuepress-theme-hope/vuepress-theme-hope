---
title: 标记
icon: highlighter
category:
  - Markdown
tag:
  - Markdown
  - 标记
---

让你的 VuePress 站点中的 Markdown 文件支持标记。

<!-- more -->

## 配置

```ts {7} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    markdown: {
      mark: true,
    },
  }),
});
```

## 语法

使用 `== ==` 进行标记。请注意两边需要有空格。

::: md-demo 案例

VuePress Theme Hope ==非常== 强大!

:::
