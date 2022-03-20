---
title: 样式配置
icon: style
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

```scss
/* 响应式布局断点 */
$wide: 1440px !default; // 宽屏
$desktop: 1280px !default; // 桌面
$pad: 959px !default; // 平板
$mobile: 719px !default; // 移动设备
$mobileS: 419px !default; // 小型移动设备

// 代码语言
$code-lang: "c" "cpp" "cs" "css" "dart" "docker" "fs" "go" "html" "java" "js"
  "json" "kt" "less" "makefile" "md" "php" "py" "rb" "rs" "sass" "scss" "sh"
  "styl" "ts" "toml" "vue" "yml" !default;

/* 内容 Class */
$content-class: ".theme-hope-content" !default;

/* 颜色列表 */
$colors: #cf1322, #fa541c, #f39c12, #2ecc71, #25a55b, #13c2c2, #096dd9, #aa6fe9,
  #eb2f96 !default;

/* 代码主题 */
$code-light-theme: "one-light" !default;
$code-dark-theme: "one-dark" !default;
```

::: details 例子

```scss
// 修改日间模式代码主题
$code-light-theme: "coy";
```

:::

## palette.scss

`palette.scss` 用于 CSS 变量写入，以下是支持的配置与默认值。

::: info

此处的所有变量 (包括你新添加的变量) 都会被转换为 kebab-case 的格式注入为 CSS 变量。

如 `$theme-color` 会被注入为 `--theme-color`，`$backgroundColor` 会被注入为 `--background-color`。

:::

### 颜色设置

对于所有颜色，如果其在浅色模式和深色模式颜色相同，可直接设置；否则，请设置一个 Map 类型的 Sass 变量分别给出浅色和深色模式下的颜色值。

```scss
$theme-color: #3eaf7c !default;

$text-color: (
  light: #2c3e50,
  dark: #9e9e9e,
) !default;

$bg-color: (
  light: #fff,
  dark: #1e1e1e,
) !default;

$bg-color-light: (
  light: #f8f8f8,
  dark: #272727,
) !default;

$bg-color-active: (
  light: #f8f8f8,
  dark: #252934,
) !default;

$bg-color-back: (
  light: #f8f8f8,
  dark: #1d2025,
) !default;

$bg-color-float: (
  light: #fff,
  dark: #252934,
) !default;

$bg-color-blur: (
  light: rgba(255, 255, 255, 0.9),
  dark: rgba(30, 30, 30, 0.9),
) !default;

$bg-color-float-blur: (
  light: rgba(255, 255, 255, 0.9),
  dark: rgba(37, 41, 52, 0.9),
) !default;

$border-color: (
  light: #eaecef,
  dark: #302d28,
) !default;

// shadow
$box-shadow: (
  light: #f0f1f2,
  dark: #0f0e0d,
) !default;

$card-shadow: (
  light: rgba(0, 0, 0, 0.15),
  dark: rgba(0, 0, 0, 0.3),
) !default;
```

::: details 例子

```scss
// 将主题颜色设置为红色
$theme-color: red;
```

:::

### 布局设置

```scss
// navbar
$navbar-height: 4.5rem !default;
$navbar-horizontal-padding: 1.5rem !default;
$navbar-vertical-padding: 0.7rem !default;
$navbar-mobile-height: 3.25rem !default;
$navbar-mobile-horizontal-padding: 1rem !default;
$navbar-mobile-vertical-padding: 0.5rem !default;

// sidebar
$sidebar-width: 18rem !default;
$sidebar-mobile-width: 16rem !default;

// content
$content-width: 740px !default;
$home-page-width: 1160px !default;

// font
$font-family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", STHeiti, "Microsoft YaHei", SimSun, sans-serif' !default;
$font-family-fancy: 'Georgia Pro, Crimson, Georgia, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", STHeiti, "Microsoft YaHei", SimSun, sans-serif' !default;

// code
$font-family-code: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace' !default;
$line-numbers-width: 2.5rem !default;

// transition
$color-transition: "0.3s ease" !default;
$transform-transition: "0.3s ease" !default;
```

::: details 例子

```scss
// 将 Windows 网页字体设置为思源宋体 (当然你也要记得导入这个字体)
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", "PingFang SC", "Hiragino Sans GB", "Noto Serif SC", "Microsoft Yahei", "WenQuanYi Micro Hei", "ST Heiti", sans-serif';
```

:::

## index.scss

填入此文件所有内容都将解析为标准 CSS，然后在主题和插件样式之后注入。

因此，您可以在此处添加新样式或覆盖样式：

::: details 例子

```scss
// 在导航栏中将站点名称改为斜体
.site-name {
  font-style: italic;
}
```

:::
