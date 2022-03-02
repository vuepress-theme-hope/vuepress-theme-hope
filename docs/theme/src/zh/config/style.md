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
$codeLang: "c" "cpp" "cs" "css" "dart" "docker" "fs" "go" "html" "java" "js"
  "json" "kt" "less" "makefile" "md" "php" "py" "rb" "rs" "sass" "scss" "sh"
  "styl" "ts" "toml" "vue" "yml" !default;

/* 内容 Class */
$contentClass: ".theme-hope-content" !default;

/** 深色模式选择器 */
$darkSelector: 'html[data-theme="dark"]' !default;
$lightSelector: 'html[data-theme="light"]' !default;

/* 颜色列表 */
$colors: #cf1322, #fa541c, #f39c12, #2ecc71, #25a55b, #13c2c2, #096dd9, #aa6fe9,
  #eb2f96 !default;

/* 代码主题 */
$codeLightTheme: "one-light" !default;
$codeDarkTheme: "one-dark" !default;
```

## palette.scss

`palette.scss` 用于 CSS 变量写入，以下是支持的配置与默认值。

::: info

此处的所有变量 (包括你新添加的变量) 都会被转换为 kebab-case 的格式注入为 CSS 变量。

如 `$themeColor` 会被注入为 `--theme-color`。

:::

### 颜色设置

对于所有颜色，如果其在浅色模式和深色模式颜色相同，可直接设置；否则，请设置一个 Map 类型的 Sass 变量分别给出浅色和深色模式下的颜色值。

```scss
$themeColor: #3eaf7c !default;

$textColor: (
  light: #2c3e50,
  dark: #9e9e9e,
) !default;

$bgColor: (
  light: #fff,
  dark: #1e1e1e,
) !default;

$bgColorLight: (
  light: #f8f8f8,
  dark: #272727,
) !default;

$bgColorBlur: (
  light: rgba(255, 255, 255, 0.9),
  dark: rgba(30, 30, 30, 0.9),
) !default;

$borderColor: (
  light: #eaecef,
  dark: #302d28,
) !default;

// shadow
$boxShadow: (
  light: #f0f1f2,
  dark: #0f0e0d,
) !default;

$cardShadow: (
  light: rgba(0, 0, 0, 0.15),
  dark: rgba(0, 0, 0, 0.3),
) !default;
```

### 布局设置

```scss
// navbar
$navbarHeight: 4.5rem !default;
$navbarHorizontalPadding: 1.5rem !default;
$navbarVerticalPadding: 0.7rem !default;
$navbarMobileHeight: 3.25rem !default;
$navbarMobileHorizontalPadding: 1rem !default;
$navbarMobileVerticalPadding: 0.5rem !default;

// sidebar
$sidebarWidth: 18rem !default;
$sidebarMobileWidth: 16rem !default;

// content
$contentWidth: 740px !default;
$homePageWidth: 1160px !default;

// font
$fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", STHeiti, "Microsoft YaHei", SimSun, sans-serif' !default;
$fontFamilyFancy: 'Georgia Pro, Crimson, Georgia, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", STHeiti, "Microsoft YaHei", SimSun, sans-serif' !default;

// code
$fontFamilyCode: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace' !default;
$lineNumbersWidth: 2.5rem !default;

// transition
$colorTransition: "0.3s ease" !default;
$transformTransition: "0.3s ease" !default;
```
