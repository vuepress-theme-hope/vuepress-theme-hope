---
title: 步骤
icon: list-ol
category:
  - Markdown
tag:
  - Markdown
  - 步骤
---

将内容划分为递进的步骤展示。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    steps: true,
  },
});
```

## 语法

将有序列表（或无序列表）包裹在 `steps` 容器中。步骤内可以使用任意 Markdown 语法。

## 演示

:::: preview

::: steps

1. 创建 VuePress 项目

   ```bash
   pnpm create vuepress-theme-hope my-docs
   ```

2. 安装依赖

   ```bash
   pnpm install
   ```

3. 启动开发服务器

   ```bash
   pnpm docs:dev
   ```

:::

::::
