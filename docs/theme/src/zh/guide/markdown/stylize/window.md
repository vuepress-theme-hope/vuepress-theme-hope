---
title: 窗口
icon: window-maximize
category:
  - Markdown
tag:
  - Markdown
  - 窗口
---

在带有标题栏的窗口中展示内容。

<!-- more -->

## 配置 {#settings}

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    window: "windows",
  },
});
```

将 `window` 设为 `true` 以启用容器并默认使用 `mac` 风格，或设为 `"mac"` / `"windows"` 以指定所有窗口的默认风格。

## 语法 {#syntax}

将内容包裹在 `window` 容器中，容器内支持任意 Markdown 语法。

`mac` 风格显示红绿灯按钮且标题居中，`windows` 风格显示最小化、最大化与关闭按钮，且标题向左对齐。在 `window` 后添加 `mac` 或 `windows`，可以覆盖单个窗口的默认风格。

```md
::: window title="你好，世界"

窗口的内容。

:::

::: window windows title="你好，世界"

窗口的内容。

:::
```

容器支持以下属性：

- `title`：窗口标题，以纯文本显示。
- `height`：内容区域的高度。数字视为像素，也接受带 `px`、`em`、`rem`、`%`、`vh`、`vw`、`vmin` 或 `vmax` 单位的长度。内容超出高度时会滚动。
- `padding`：内容区域的内边距。数字视为像素，也接受带 `px`、`em`、`rem`、`%`、`vh`、`vw`、`vmin` 或 `vmax` 单位的长度。
- `no-padding`：移除内容区域的内边距，适用于需要填满窗口的图片与演示。

## 演示 {#demo}

:::: preview

::: window title="你好，世界"

窗口的内容支持任意 Markdown 语法。

```ts
console.log("Hello World!");
```

:::

::::

:::: preview

::: window windows title="你好，世界"

窗口的内容支持任意 Markdown 语法。

```ts
console.log("Hello World!");
```

:::

::::
