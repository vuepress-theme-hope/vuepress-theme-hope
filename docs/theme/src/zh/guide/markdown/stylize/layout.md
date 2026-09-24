---
title: 布局
icon: table-columns
category:
  - Markdown
tag:
  - Markdown
  - 布局
---

使用指令创建 Flexbox、Grid 与多列布局。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    layout: true,
  },
});
```

## 语法

使用复数指令开启一个布局，使用单数指令表示其中的项目，并使用 `@end` 结束布局。

- Flexbox：`@flexs` 开启布局，`@flex` 添加项目。
- CSS Grid：`@grids` 开启布局，`@grid` 添加项目。
- 多列：`@columns` 开启布局，`@column` 添加项目。

支持以空格分隔的工具类，例如 `gap-4`、`items-center`、`flex-1` 和 `grid-cols-2`，默认会将它们转换为内联样式。

你也可以使用 `@flexs.nav#top gap-4` 为布局添加类名与 id。

布局支持嵌套，使用 `@end` 依次结束，也可以使用 `@@`、`@@@` 显式声明层级深度。

完整的工具类与选项请参阅 [@mdit/plugin-layout](https://mdit-plugins.github.io/zh/layout.html)。

## 演示

:::: preview

@flexs gap-4 items-center

@flex flex-1

我会占据全部剩余空间。

@flex

我使用自然宽度。

@end

::::
