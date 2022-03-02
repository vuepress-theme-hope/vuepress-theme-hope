---
title: Style config
icon: style
category:
  - Config
tag:
  - Theme Config
  - Style
---

You can change the theme’s styles in `.vuepress/styles` by writing variable values in the `config.scss` and `palette.scss` files.

<!-- more -->

## config.scss

`config.scss` is used for pure variable config, the following are supported variables and default values.

```scss
/* responsive breakpoints */

// wide screen
$wide: 1440px !default;
// desktop
$desktop: 1280px !default;
// narrow desktop / iPad
$pad: 959px !default;
// wide mobile
$mobile: 719px !default;
// narrow mobile
$mobileS: 419px !default;

// code languages
$codeLang: "c" "cpp" "cs" "css" "dart" "docker" "fs" "go" "html" "java" "js"
  "json" "kt" "less" "makefile" "md" "php" "py" "rb" "rs" "sass" "scss" "sh"
  "styl" "ts" "toml" "vue" "yml" !default;

/* Content Class */
$contentClass: ".theme-hope-content" !default;

/** dark mode selecters */
$darkSelector: 'html[data-theme="dark"]' !default;
$lightSelector: 'html[data-theme="light"]' !default;

/* Color list */
$colors: #cf1322, #fa541c, #f39c12, #2ecc71, #25a55b, #13c2c2, #096dd9, #aa6fe9,
  #eb2f96 !default;

/* Code Theme */
$codeLightTheme: "one-light" !default;
$codeDarkTheme: "one-dark" !default;
```

## palette.scss

`palette.scss` is used for CSS variable injecting, the following are supported configurations and default values.

::: info

All variables here (including your newly added variables) will be converted to kebab-case format and injected as CSS variables.

For example `$themeColor` will be injected as `--theme-color`.

:::

### Color Config

For all colors, if they are the same in light mode and dark mode, you can set them directly; otherwise, please set a Sass variable of type Map to give the color values in light and dark modes respectively.

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

### Layout Config

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
