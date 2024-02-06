---
title: Customize color
icon: palette
order: 1
category:
  - Cookbook
  - Customize
tag:
  - Customize
---

This page guides you how to customize theme colors.

<!-- more -->

## Modify the built-in color

The theme controls the color through the palette, you may need to set your color in two situations:

1. This color remains the same in day mode and night mode, like theme color.
2. This color is different in day mode, night mode, such as background color, font, border color, etc.

The palette file is the `.vuepress/styles/palette.scss` file under the VuePress project folder.

For the former, you need to write variable values in `palette.scss`, e.g.:

```scss title=".vuepress/styles/palette.scss"
$theme-color: #3eaf7c;
```

For the latter, you need to set up a Map with key names `light` and `dark`, and values as color values, e.g.:

```scss title=".vuepress/styles/palette.scss"
$bg-color: (
  light: #fff,
  dark: #000,
);
```

See [Theme Configuration → Color Settings](../../config/style.md#color-config) for all available color variables.

## Modify other colors

Sometimes, you may want to modify some colors that are not in `palette.scss`, such as the background color of the code block. At this time, you can check whether the corresponding color attribute value is a CSS variable through the devTools. If so, you can go to `index.scss` to manually override this variable value:

```scss title=".vuepress/styles/index.scss"
// override code block background color
#app {
  --code-bg-color: #000;

  html[data-theme="dark"] & {
    --code-bg-color: #222;
  }
}
```

If not, write your own selectors to override them:

```scss title=".vuepress/styles/index.scss"
// override code block language font color
pre[class*="language-"]::before {
  color: #fff !important;

  html[data-theme="dark"] & {
    background-color: #222 !important;
  }
}
```
