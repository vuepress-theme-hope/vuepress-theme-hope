---
title: 任务列表
icon: square-check
category:
  - Markdown
tag:
  - Markdown
  - 任务列表
---

让你的 VuePress 站点中的 Markdown 文件支持任务列表。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    tasklist: true,
  },
});
```

## 语法

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (我们也支持大写的 `X`)

::: md-demo 案例

- [ ] 计划 A
- [x] 计划 B

:::

## 高级

除了设置 `markdown.tasklist: true` 之外，你还可以将对象作为选项传递:

```ts twoslash {5-19} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    tasklist: {
      /**
       * 是否禁用 checkbox
       *
       * @default true
       */
      disabled: false,

      /**
       * 是否使用 `<label>` 来包裹文字
       *
       * @default true
       */
      label: false,
    },
  },
});
```
