---
title: Style config
icon: wand-magic-sparkles
order: 7
category:
  - Config
tag:
  - Theme Config
  - Style
---

You can change the theme's styles in `.vuepress/styles` by setting variable values in the `config.scss` and `palette.scss` files.

Also, you can add your own styles in `.vuepress/styles/index.scss`.

<!-- more -->

## config.scss

`config.scss` is used for pure variable config, the following are supported variables and default values.

Responsive breakpoints:

- `$pc`
- `$laptop`
- `$pad`
- `$tablet`
- `$mobile`

Theme Color:

- `$theme-color`: theme color, multiple colors and even light/dark maps are supported.

Code block (Only available with shiki):

- `$code-bg-color`: background color for code blocks
- `$code-color`: font color for code blocks

Color list:

- `$colors`: Used to generate color list.

::: details Demo

```scss
// update pc breakpoint
$pc: 1920px;
```

:::

::: details Default value

@[code{7-}](../../../../packages/theme/templates/palette/config.scss)

:::

## palette.scss

`palette.scss` is used for CSS variable injecting, the following are supported configurations and default values.

::: info

All variables here (including your newly added variables) will be converted to kebab-case format and injected as CSS variables.

For example `$vp-c-text` will be injected as `--vp-c-text`, and `$vp-c-bg` will be injected as `--vp-c-bg`.

:::

### Color Config

For all colors, if they are the same in light mode and dark mode, you can set them directly; otherwise, please set a Sass variable of type Map to give the color values in light and dark modes respectively.

Available color variables:

#### Text

- `$vp-c-text`: Default text color.

By default, the theme automatically generates the following colors based on the `$vp-c-text`, but you can still customize them:

- `$vp-c-text-mute`: Colors for muted texts, such as "inactive menu" or "info texts".
- `$vp-c-text-subtle`: Color for subtle text, such as as "placeholders" or "caret icon".

#### Background

- `$vp-c-bg`: The bg color used for main screen.
- `$vp-c-bg-alt`: The alternative bg color used in places such as "sidebar", or "code block".
- `$vp-c-bg-elv`: The elevated bg color. This is used at parts where it "floats", such as "dialog".

#### Shadow

- `$vp-c-shadow`: Shadow color

#### Accent

Accent color and brand colors which used for interactive components.

By default, the theme automatically generates the following accent colors based on the `$theme-color` in config file, but you can still customize them:

- `$vp-c-accent`: The most solid color used mainly for colored text. It must satisfy the contrast ratio against when used on top of `$vp-c-accent-soft`.
- `$vp-c-accent-hover`: Color used for hover state.
- `$vp-c-accent-bg`: Color used for solid background. It must satisfy the contrast ratio with `$vp-c-accent-text` on top of it.
- `$vp-c-accent-text`: Color used for text with `$vp-c-accent-bg` background. It must satisfy the contrast ratio with `$vp-c-accent-bg`.
- `$vp-c-accent-soft`: The color used for subtle background such as custom container or badges. It must satisfy the contrast ratio when putting `$vp-c-accent` colors on top of it.

  The soft color must be semi transparent alpha channel. This is crucial because it allows adding multiple "soft" colors on top of each other to create a accent, such as when having inline code block inside custom containers.

#### Borders

- `$vp-c-border`: Border color for interactive components. For example this should be used for a button outline.
- `$vp-c-divider`: Color for separators, used to divide sections within the same components, such as having separator on "h2" heading.

By default, the theme automatically generates the following colors based on the `$vp-c-border`, but you can still customize them:

- `$vp-c-border-hard`: Darker border colors, which is used for "hard" borders closed to text, such as table and kbd.

#### Controls

- `$vp-c-control`: Background color for interactive controls, such as buttons or checkboxes.
- `$vp-c-control-hover`: Background color for hover state of interactive controls.
- `$vp-c-control-disabled`: Color for disabled state of interactive controls.

::: details Demo

```scss
// set accent color to red
// Note: you should also set other accent color variables to make them constant
$vp-c-accent: red;

// setting border color with a darker value
$vp-c-border: (
  light: #ddd,
  dark: #444,
);
```

:::

::: details Default value

@[code{4-60}](../../../../packages/theme/templates/palette/color.scss)

:::

### Layout Config

Available layout variables:

Navbar:

- `$navbar-height`: navbar height
- `$navbar-padding-x`: navbar horizontal padding
- `$navbar-padding-y`: navbar vertical padding
- `$navbar-mobile-height`: navbar height on mobile devices
- `$navbar-mobile-padding-x`: navbar horizontal padding on mobile
- `$navbar-mobile-padding-y`: navbar vertical padding on mobile

Sidebar:

- `$sidebar-width`: sidebar width
- `$sidebar-mobile-width`: sidebar width on mobile

Content:

- `$content-width`: width of main content
- `$wide-content-width`: width of main content in wide screens (screen width >= 1920px)
- `$home-page-width`: width of homepage content

::: details Demo

```scss
// update navbar height on mobile
$navbar-mobile-height: 3.5rem;
```

:::

::: details Default value

@[code](../../../../packages/theme/templates/palette/layout.scss)

:::

### Font

Available font variables:

- `$vp-font`: font family for normal text
- `$vp-font-heading`: font family for heading elements
- `$vp-font-mono`: font family for code blocks

::: details Default value

@[code](../../../../packages/theme/templates/palette/font.scss)

:::

### Transition

Available transition variables:

- `$vp-t-color`: transition used on colors
- `$vp-t-transform`: transition used on transform animation

::: details Default value

@[code](../../../../packages/theme/templates/palette/transition.scss)

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
