---
title: Code Themes
icon: style
order: 4
category:
  - Interface
tag:
  - Interface
  - Code Themes
---

`vuepress-theme-hope` allows you to set code block themes for lightmode and darkmode globally.

<!-- more -->

::: tip

Due to output size consideration, we will not import all styles globally to support code theme config per code block.

:::

## How to Customize

You should configure following variables in `.vuepress/styles/config.scss` to set code themes.

- `$code-light-theme`: code theme used in light mode, default is `"one-light"`
- `$code-dark-theme`: code theme used in dark mode, default is `"one-dark"`

## Available Themes

::: info Light themes

- ateliersulphurpool-light
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
- vsc-dark-plus
- xonokai
- z-touch

:::
