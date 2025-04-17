---
title: 剧透
icon: eraser
category:
  - Markdown
tag:
  - Markdown
  - 剧透
---

在你的 VuePress 站点中添加剧透文字。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    spoiler: true,
  },
});
```

## 语法

使用 `!! !!` 标记剧透剧透文字。请注意两边需要有空格。

::: md-demo 案例

VuePress Theme Hope !!非常强大!!!

:::
