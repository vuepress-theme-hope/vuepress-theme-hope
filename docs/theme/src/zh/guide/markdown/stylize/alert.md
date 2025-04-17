---
title: GFM 警告
icon: bell
category:
  - Markdown
tag:
  - Markdown
  - 警告
---

主题可以提供 GFM 警告支持。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    alert: true,
  },
});
```

<!-- markdownlint-disable MD028 -->

::: md-demo 警告案例

> [!important]
> 重要文字

> [!info]
> 信息文字

> [!tip]
> 提示文字

> [!warning]
> 注意文字

> [!caution]
> 警告文字

> [!note]
> 注释文字

:::

<!-- markdownlint-enable MD028 -->
