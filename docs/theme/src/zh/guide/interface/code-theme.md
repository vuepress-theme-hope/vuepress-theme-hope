---
title: 代码主题
icon: style
order: 4
category:
  - 界面
tag:
  - 界面
  - 代码主题
---

`vuepress-theme-hope` 允许你全局为代码块在日间模式和夜间模式下配置不同主题。

<!-- more -->

::: tip

处于对输出样式大小的考量，我们不会全局引入所有样式。所以我们不支持在代码块单独配置主题。

:::

## 设置方式

请在 `.vuepress/styles/config.scss` 中设置以下变量来控制代码块主题。

- `$code-light-theme`: 浅色模式下代码主题，默认为 `"one-light"`
- `$code-dark-theme`: 深色模式下代码主题，默认为 `"one-dark"`

## 可用的主题

::: info 浅色主题

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

::: info 深色主题

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
