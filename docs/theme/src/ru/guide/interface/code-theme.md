---
title: Темы кода
icon: wand-magic-sparkles
order: 4
category:
  - Интерфейс
tag:
  - Интерфейс
  - Темы кода
---

`vuepress-theme-hope` позволяет вам глобально устанавливать темы блока кода для светлого и темного режима.

<!-- more -->

::: tip

Из-за соображений размера вывода мы не будем импортировать все стили глобально, чтобы поддерживать настройку темы кода для каждого блока кода.

:::

## Как настроить

Вы должны настроить следующие переменные в `.vuepress/styles/config.scss`, чтобы установить темы кода.

- `$code-light-theme`: тема кода, используемая в облегченном режиме, по умолчанию `"one-light"`
- `$code-dark-theme`: тема кода, используемая в темном режиме, по умолчанию `"one-dark"`

## Доступные темы

::: info Светлые темы

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

::: info Темный темы

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
