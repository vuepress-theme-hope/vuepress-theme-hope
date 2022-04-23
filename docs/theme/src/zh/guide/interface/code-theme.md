---
title: 代码主题
icon: style
index: 4
category:
  - 界面
tag:
  - 界面
  - 代码主题
---

`vuepress-theme-hope` 允许你全局为日间模式和夜间模式分别配置代码颜色主题。

<!-- more -->

::: tip

处于对输出样式大小的考量，我们不会全局引入所有样式。所以我们不支持在代码块单独配置主题。

:::

## 设置方式

请在 `.vuepress/styles/config.scss` 中通过设置 `$code-light-theme` 和 `$code-dark-theme` 变量，来分别配置浅色和深色模式下使用的代码主题。

它们的默认值分别为 `"one-light"` 和 `"one-dark"`。

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
- vsc-dark
- xonokai
- z-touch

:::
