---
title: Style config
icon: style
order: 6
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

Responsive breakpoints:

- `$pc`
- `$laptop`
- `$pad`
- `$tablet`
- `$mobile`

Code block:

- `$code-light-theme`: code block theme in lightmode
- `$code-dark-theme`: code block theme in darkmode

Content class: `$content-class`

Color list: `$colors`

::: details Demo

```scss
// modify code theme in lightmode
$code-light-theme: "coy";

// update pc breakpoint
$pc: 1920px;
```

:::

::: details Default value

@[code{7-}](../../../../packages/theme/templates/config.scss)

:::

## palette.scss

`palette.scss` is used for CSS variable injecting, the following are supported configurations and default values.

::: info

All variables here (including your newly added variables) will be converted to kebab-case format and injected as CSS variables.

For example `$theme-color` will be injected as `--theme-color`, and `$backgroundColor` will be injected as `--$background-color`.

:::

### Color Config

For all colors, if they are the same in light mode and dark mode, you can set them directly; otherwise, please set a Sass variable of type Map to give the color values in light and dark modes respectively.

Available color variables:

- `$theme-color`: theme color
- `$text-color`: text color
- `$bg-color`: background color
- `$bg-color-secondary`: another "lighter" background color
- `$border-color`: border color
- `$box-shadow`: shadow color using on elements
- `$card-shadow`: shadow color using on cards

::: details Demo

```scss
// set theme color to red
$theme-color: red;

// setting border color with a darker value
$border-color: (
  light: #ddd,
  dark: #444,
);
```

:::

::: details Default value

@[code{4-60}](../../../../packages/theme/templates/color.scss)

:::

### Layout Config

Available layout variables:

Navbar:

- `$navbar-height`: navbar height
- `$navbar-horizontal-padding`: navbar horizontal padding
- `$navbar-vertical-padding`: navbar vertical padding
- `$navbar-mobile-height`: navbar height on mobile devices
- `$navbar-mobile-horizontal-padding`: navbar horizontal padding on mobile
- `$navbar-mobile-vertical-padding`: navbar vertical padding on mobile

Sidebar:

- `$sidebar-width`: sidebar width
- `$sidebar-mobile-width`: sidebar width on mobile

Content:

- `$content-width`: width of main content
- `$home-page-width`: width of homepage content

Fonts:

- `$font-family`: font family used on normal text
- `$font-family-fancy:` font family used on fancy elements

Code:

- `$font-family-code`: font family used on code
- `$line-numbers-width`: width of line number in code blocks

Transition:

- `$color-transition`: transition used on colors
- `$transform-transition`: transition used on transform animation

::: details Demo

```scss
// update navbar height on mobile
$navbar-mobile-height: 3.5rem;

// Override default font
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", "PingFang SC", "Hiragino Sans GB", sans-serif';
```

:::

::: details Default value

@[code](../../../../packages/theme/templates/layout.scss)

:::

## index.scss

Everything filling in this will be parsed to standard CSS and then injected after theme and plugins styles.

So you can add new styles or override styles here:

::: details Demo

```scss
// make site name in navbar italic
.site-name {
  font-style: italic;
}
```

:::
