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

Due to output size consideration, we will not import all styles globally to support code theme config per code block.

:::

## How to Customize

Set `$code-light-theme` and `$code-dark-theme` variables in `.vuepress/styles/config.scss` to config code themes used under lightmode and darkmode.

Their default values ​​are `"one-light"` and `"one-dark"`.

## Available Themes

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
