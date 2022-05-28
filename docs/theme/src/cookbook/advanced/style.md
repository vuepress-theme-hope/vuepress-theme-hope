---
title: Style Customization
icon: style
category:
  - Cookbook
  - Customize
tag:
  - Customize
  - Style
---

This article briefly describes how to customize theme styles.

<!-- more -->

## How to Customize Styles

You can create three files under `.vuepress/styles` folder in your own document for style customization.

- `index.scss`: You can place your own styles via CSS or SCSS syntax to modify the appearance of the theme here.

  These styles will be injected after theme and plugin styles.

- `config.scss`: You can set some style related variables here, including responsive breakpoints, container class names, code themes, etc.

- `palette.scss`: You can set some color and layout related variables here, such as theme color, background color, navbar height, etc.

For the complete config list supported by the above files, see [Config → Style](../../config/style.md).

## Common style Customization

### Modify Background Color

Please configure the variables starting with `$bg-color` in `config.scss`, see [Configuration → Style](../config/style.md#color setting)

### Modify Theme Font

If you prefer **serif**[^serif] to **sans-serif**[^sans-serif], you can modify the font yourself. Please set `$font-family` to value you want in `palette.scss`.

::: tip Best Practice

To let your site display well on different operating systems and devices with different fonts installed, you should set a fallback font [^fallback-font].

So we recommend using the following font set as your preferred serif style:

```scss
$font-family: 'Georgia, -apple-system, "Nimbus Roman No9 L", sans-serif';
```

:::

[^serif]: <https://simple.wikipedia.org/wiki/Serif>
[^sans-serif]: <https://simple.wikipedia.org/wiki/Sans_serif>
[^fallback-font]: <https://en.wikipedia.org/wiki/Fallback_font>

### Modify Theme Layout

The theme allows you to freely config navbar, sidebar and footer, and you can also disable them if you don’t like them. Please see [Guide → Layout → Navbar](../../guide/layout/navbar.md), [Guide → Layout → Sidebar](../../guide/layout/sidebar.md) and [Guide → Layout→ Footer](../../guide/layout/footer.md) for full configuration instructions.

The theme’s content layout also supports customization, if you don’t like some features that are enabled by default, you are free to disable them. For details, please search through the search function of the document.

### Modify Animation Speed

If you don’t like the animation speed of the theme and think they are too fast or too slow, you can set `$transform-transition` in `palette.scss` to change the animation duration and animation speed curve, the default value is `"0.3 ease"`.

### Modify Component Styles

If you are not satisfied with the styling of some components and want to make some tweaks on them, you can override the theme’s default styles by adding CSS with `!important` in `index.scss`.

If your changes involve modifying the component DOM (document structure), you may need to refer to the [Replace Theme Components](replace.md) section to customize the override of the component.

### Add New Layout or Edit theme

To do some revamping of the whole theme, or want to add a new layout, you can extend the theme. The new theme can be stored locally in the project, or it can be republished as a new theme on npm.

For related content, see [Extending Theme](extend.md).
