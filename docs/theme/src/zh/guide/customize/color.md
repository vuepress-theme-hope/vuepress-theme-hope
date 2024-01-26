---
title: 修改颜色
icon: palette
order: 1
category:
  - 教程
  - 自定义
tag:
  - 自定义
---

此页面指导你如何自定义主题颜色。

<!-- more -->

## 修改内置颜色

主题通过调色板控制颜色，你可能需要分为两种情况设置你的颜色：

1. 此颜色在日间模式和夜间模式保持不变，如主题色。
2. 此颜色在日间模式、夜间模式下不同，如背景色、字体、边框颜色等。

调色板文件是 VuePress 项目文件夹下的 `.vuepress/styles/palette.scss` 文件。

对于前者，你需要在 `palette.scss` 中写入变量值，如：

```scss title=".vuepress/styles/palette.scss"
$theme-color: #3eaf7c;
```

对于后者，你需要设置一个 Map，键名为 `light` 和 `dark`，值为颜色值，如：

```scss title=".vuepress/styles/palette.scss"
$bg-color: (
  light: #fff,
  dark: #000,
);
```

所有可用的颜色变量详见 [主题配置 → 颜色设置](../../config/style.md#颜色设置)。

## 修改其他颜色

有些时候，你可能希望修改一些不在 `palette.scss` 中的颜色，比如代码块的背景色，此时你可以通过开发者工具查看对应的颜色属性值是否是 CSS 变量，如果是你可以在 `index.scss` 中手动覆盖这一变量值:

```scss title=".vuepress/styles/index.scss"
// 覆盖代码块背景色
#app {
  --code-bg-color: #000;

  html[data-theme="dark"] & {
    --code-bg-color: #222;
  }
}
```

如果不是，请你自己编写选择器覆盖它们:

```scss title=".vuepress/styles/index.scss"
// 覆盖代码块语言字体颜色
pre[class*="language-"]::before {
  color: #fff !important;

  html[data-theme="dark"] & {
    background-color: #222 !important;
  }
}
```
