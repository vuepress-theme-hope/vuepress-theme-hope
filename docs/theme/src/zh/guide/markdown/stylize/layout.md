---
title: 布局
icon: code
category:
  - Markdown
tag:
  - Markdown
  - 布局
---

在你的 VuePress 站点中，使用基于指令的语法创建 Flexbox、CSS Grid 和多栏布局。

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

插件使用"复数形式为容器、单数形式为子项"的约定：

| 类型     | 容器       | 子项      | 结束   |
| -------- | ---------- | --------- | ------ |
| Flexbox  | `@flexs`   | `@flex`   | `@end` |
| CSS Grid | `@grids`   | `@grid`   | `@end` |
| 多栏     | `@columns` | `@column` | `@end` |

例如：

```md
@flexs gap-4 items-center

@flex.flex-demo flex-1

### 左栏

此内容会扩展以填满可用空间。

@flex.flex-demo

### 右栏

此内容保持其自然宽度。

@end
```

### 属性注入

你可以直接在指令名称后附加 class 和 id 选择器：

- `@flexs.nav#top gap-4 items-center`
  - `.class-name` 添加 CSS class
  - `#id` 添加 HTML id
  - 选择器之后的空格分隔文本是映射到内联样式的工具类

### 嵌套

相同或不同的容器可以嵌套在子项中：

```md
@flexs
@flex
@grids grid-cols-2
@grid
嵌套内容
@end
@end
```

对于复杂嵌套，你可以使用多个 `@` 的前缀模式来提供明确的深度指示：

```md
@flexs
@flex
@@flexs
@@flex
内容（通过 @@ 表示深度 2）
@@end
@end
```

在前缀模式下，`@@` 表示深度 2，`@@@` 表示深度 3，以此类推。子项和 `@end` 必须与其容器使用相同数量的 `@`。

## 支持的实用类

默认情况下，实用类会转换为内联 CSS 样式。

### Flexbox

- 方向: `flex-row`、`flex-col`、`flex-row-reverse`、`flex-col-reverse`
- 换行: `flex-wrap`、`flex-nowrap`、`flex-wrap-reverse`
- 弹性: `flex-1`、`flex-auto`、`flex-initial`、`flex-none`
- 缩放: `grow`、`grow-0`、`shrink`、`shrink-0`
- 排序: `order-{n}`、`order-first`、`order-last`、`order-none`

### Grid

- 列: `grid-cols-{n}`、`grid-cols-none`
- 行: `grid-rows-{n}`、`grid-rows-none`
- 跨度: `col-span-{n}`、`col-span-full`、`row-span-{n}`、`row-span-full`
- 开始/结束: `col-start-{n}`、`col-end-{n}`、`row-start-{n}`、`row-end-{n}`
- 自动流动: `grid-flow-row`、`grid-flow-col`、`grid-flow-dense`、`grid-flow-row-dense`、`grid-flow-col-dense`
- 自动尺寸: `auto-cols-auto`、`auto-cols-min`、`auto-cols-max`、`auto-cols-fr`、`auto-rows-auto`、`auto-rows-min`、`auto-rows-max`、`auto-rows-fr`

### 间距与对齐

- 间距: `gap-{n}`、`gap-x-{n}`、`gap-y-{n}`、`gap-px`、`gap-x-px`、`gap-y-px`
- 主轴对齐: `justify-start`、`justify-end`、`justify-center`、`justify-between`、`justify-around`、`justify-evenly`、`justify-stretch`
- 子项对齐: `justify-items-{value}`、`justify-self-{value}`
- 交叉轴对齐: `items-{value}`、`self-{value}`、`content-{value}`
- 位置: `place-content-{value}`、`place-items-{value}`、`place-self-{value}`

### 多栏

- 栏数: `columns-{n}`
- 断点: `break-after-{value}`、`break-before-{value}`、`break-inside-{value}`
- 跨栏: `.span-all` 类映射到 `column-span: all`

### 其他

- 宽高比: `aspect-auto`、`aspect-square`、`aspect-video`

完整的语法和所有实用类，请参阅 [@mdit/plugin-layout](https://mdit-plugins.github.io/zh/layout.html#语法)。

## 案例

::::: preview Flexbox

@flexs gap-4 items-center

@flex.flex-demo flex-1

### 左栏

此内容会扩展以填满可用空间。

@flex.flex-demo

### 右栏

此内容保持其自然宽度。

@end

:::::
