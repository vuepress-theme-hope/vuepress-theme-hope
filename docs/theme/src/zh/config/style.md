---
title: 样式配置
icon: style
order: 6
category:
  - 配置
tag:
  - 主题配置
  - 样式
---

你可以在 `.vuepress/styles` 中通过在 `config.scss` 和 `palette.scss` 文件中写入变量值来更改主题的样式。

你也可以在 `.vuepress/styles/index.scss` 中添加你自己的样式。

<!-- more -->

## config.scss

`config.scss` 用于纯变量配置，以下是支持的变量与默认值。

响应式布局断点:

- `$pc`
- `$laptop`
- `$pad`
- `$tablet`
- `$mobile`

代码块:

- `$code-light-theme`: 日间模式代码块主题
- `$code-dark-theme`: 夜间模式代码块主题

内容类名: `$content-class`

颜色列表: `$colors`

::: details 例子

```scss
// 修改日间模式代码主题
$code-light-theme: "coy";

// 修改电脑响应式布局断点
$pc: 1920px;
```

:::

::: details 默认值

@[code{7-}](../../../../../packages/theme/templates/config.scss)

:::

## palette.scss

`palette.scss` 用于 CSS 变量写入，以下是支持的配置与默认值。

::: info

此处的所有变量 (包括你新添加的变量) 都会被转换为 kebab-case 的格式注入为 CSS 变量。

如 `$theme-color` 会被注入为 `--theme-color`，`$backgroundColor` 会被注入为 `--background-color`。

:::

### 颜色设置

对于所有颜色，如果其在浅色模式和深色模式颜色相同，可直接设置；否则，请设置一个 Map 类型的 Sass 变量分别给出浅色和深色模式下的颜色值。

可用的颜色变量:

- `$theme-color`: 主题色
- `$text-color`: 字体颜色
- `$bg-color`: 背景色
- `$bg-color-secondary`: 另一套更浅的背景色
- `$border-color`: 边框颜色
- `$box-shadow`: 元素阴影色
- `$card-shadow`: 卡片阴影色

::: details 例子

```scss
// 将主题颜色设置为红色
$theme-color: red;

// 将边框颜色加深
$border-color: (
  light: #ddd,
  dark: #444,
);
```

:::

::: details 默认值

@[code{4-60}](../../../../../packages/theme/templates/color.scss)

:::

### 布局设置

可用的布局变量:

导航栏:

- `$navbar-height`: 导航栏高度
- `$navbar-horizontal-padding`: 导航栏水平填充
- `$navbar-vertical-padding`: 导航栏垂直填充
- `$navbar-mobile-height`: 移动设备上的导航栏高度
- `$navbar-mobile-horizontal-padding`: 移动设备上的导航栏水平填充
- `$navbar-mobile-vertical-padding`: 移动设备上的导航栏垂直填充

侧边栏:

- `$sidebar-width`: 侧边栏宽度
- `$sidebar-mobile-width`: 移动设备侧边栏宽度

内容:

- `$content-width`: 主要内容的宽度
- `$home-page-width`: 主页内容的宽度

字体:

- `$font-family`: 普通文本上使用的字体
- `$font-family-fancy:` 用于花哨元素的字体

代码:

- `$font-family-code`: 代码上使用的字体
- `$line-numbers-width`: 代码块中行号的宽度

过渡:

- `$color-transition`: 用于颜色的过渡
- `$transform-transition`: 用于变换动画的过渡

::: details 例子

```scss
// 加大移动设备上的导航栏高度
$navbar-mobile-height: 3.5rem;

// 将 Windows 网页字体设置为思源宋体 (当然你也要记得导入这个字体)
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", "PingFang SC", "Hiragino Sans GB", "Noto Serif SC", "Microsoft Yahei", "WenQuanYi Micro Hei", "ST Heiti", sans-serif';
```

:::

::: details 默认值

@[code](../../../../../packages/theme/templates/layout.scss)

:::

## index.scss

填入此文件所有内容都将解析为标准 CSS，然后在主题和插件样式之后注入。

因此，你可以在此处添加新样式或覆盖样式:

::: details 例子

```scss
// 在导航栏中将站点名称改为斜体
.site-name {
  font-style: italic;
}
```

:::
