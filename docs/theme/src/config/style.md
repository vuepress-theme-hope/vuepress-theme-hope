---
title: Style config
icon: style
category:
  - Config
tag:
  - Theme Config
  - Style
---

You can change the theme’s styles in `.vuepress/styles` by setting variable values in the `config.scss` and `palette.scss` files.

Also you can add your own styles in `.vuepress/styles/index.scss`.

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
$code-lang: "c" "cpp" "cs" "css" "dart" "docker" "fs" "go" "html" "java" "js"
  "json" "kt" "less" "makefile" "md" "php" "py" "rb" "rs" "sass" "scss" "sh"
  "styl" "ts" "toml" "vue" "yml" !default;

/* Content Class */
$content-class: ".theme-hope-content" !default;

/* Color list */
$colors: #cf1322, #fa541c, #f39c12, #2ecc71, #25a55b, #13c2c2, #096dd9, #aa6fe9,
  #eb2f96 !default;

/* Code Theme */
$code-light-theme: "one-light" !default;
$code-dark-theme: "one-dark" !default;
```

::: details Demo

```scss
// modify code theme in lightmode
$code-light-theme: "coy";
```

:::

## palette.scss

`palette.scss` is used for CSS variable injecting, the following are supported configurations and default values.

::: info

All variables here (including your newly added variables) will be converted to kebab-case format and injected as CSS variables.

For example `$theme-color` will be injected as `--theme-color`, and `$backgroundColor` will be injected as `--$background-color`.

:::

### Color Config

For all colors, if they are the same in light mode and dark mode, you can set them directly; otherwise, please set a Sass variable of type Map to give the color values in light and dark modes respectively.

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

::: details Demo

```scss
// set theme color to red
$theme-color: red;
```

:::

### Layout Config

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

::: details Demo

```scss
// Overide default font
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", "PingFang SC", "Hiragino Sans GB", sans-serif';
```

:::

## index.scss

Everything filling in this will be parsed to standard CSS and then injected after theme and plugins styles.

So you can add new styles or overide styles here:

::: details Demo

```scss
// make site name in navbar italic
.site-name {
  font-style: italic;
}
```

:::
