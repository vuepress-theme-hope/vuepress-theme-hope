---
title: Code Themes
icon: style
category:
  - interface
tag:
  - interface
  - Code Themes
---

`vuepress-theme-hope` allows you to globally configure code them themes separately for lightmode and darkmode.

<!-- more -->

::: tip

Considering the size of the output style, we will not introduce all styles globally to support separate theme configuration in code blocks.

:::

## Setting method

Please configure the themes used in the two modes through `$code-light-theme` and `$code-dark-theme` in `.vuepress/styles/config.scss`, the default values ​​are `"one-light"` and `"one-dark"`.

## Available themes

::: info Light themes

-ateliersulphurpool-light

- coldark-cold
- coy
- duotone-light
- ghcolors
- gruvbox-light
- material-light
- one-light
- vs

:::

::: info Dark themes

- atom-dark
- cb
- coldark-dark
- dark
- dracula
- duotone-dark
- duotone-earth
- duotone-forest
- duotone-sea
- duotone-space
- gruvbox-dark
- holi
- hopscotch
- lucario
- material-dark
- material-oceanic
- night-owl
- nord
- one-dark
- pojoaque
- shades-of-purple
- solarized-dark-atom
- tomorrow
- vsc-dark
- xonokai
- z-touch

:::
