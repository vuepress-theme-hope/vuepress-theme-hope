---
title: Customize colors
icon: palette
order: 1
category:
  - Cookbook
  - Customize
tag:
  - Customize
---

This page guides you how to customize colors in theme.

<!-- more -->

## Modify the built-in color

The theme controls the color through config file and palette file. These files are `.vuepress/styles/{config|palette}.scss` files under the VuePress project folder.

You may need to set colors under two situations:

1. This color remains the same in day mode and night mode, e.g.: theme color.
1. This color is different in light mode and dark mode, such as background color, font color, border color, etc.

For the former, you need to write variable values directly, e.g.:

```scss title=".vuepress/styles/config.scss"
$theme-color: #3eaf7c;
```

For the latter, you need to set a color map with `light` and `dark` keys and color values, e.g.:

```scss title=".vuepress/styles/palette.scss"
$vp-c-bg: (
  light: #fff,
  dark: #000,
);
```

See [Theme Configuration → Color Settings](../../config/style.md#color-config) for all available color variables.

## Modify other colors

Sometimes, you may want to modify some colors that are not in `palette.scss`, such as the background color of the code block. At this time, you can check whether the corresponding color attribute value is a CSS variable through the devTools.

If so, you can go to `index.scss` to manually override this variable value:

```scss title=".vuepress/styles/index.scss"
// override code block background color
#app {
  --code-c-bg: #fff;

  [data-theme="dark"] & {
    --code-c-bg: #000;
  }
}
```

If not, write your own selectors to override them:

```scss title=".vuepress/styles/index.scss"
// override code block background color
pre[class*="language-"] {
  background-color: #fff !important;

  [data-theme="dark"] & {
    background-color: #222 !important;
  }
}
```
