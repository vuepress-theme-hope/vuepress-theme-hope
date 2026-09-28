---
title: Copyright Plugin Config
icon: copyright
order: 7
category:
  - Config
tag:
  - Copyright
  - Plugin Config
  - Theme Config
---

## Intro

The theme can append copyright information while copying via `@vuepress/plugin-copyright`, and it's **not** enabled by default.

You can enabled this feature by setting `plugins.copyright` to `true` in theme options. The default behavior globally enables the plugin and use author and license defined in theme options.

## Plugin Options

The theme passes `plugins.copyright` in theme options as plugin options to `@vuepress/plugin-copyright` plugin.

You can pass your own options with `plugins.copyright`, here are some common ones:

::: fields
@`triggerLength` type=number default=`100`

Min words triggering copyright append.

@`global` type=boolean

Whether enabled globally.

@`disableCopy` type=boolean

Disable copy.

@`disableSelection` type=boolean

Disable selection.

@`canonical` type=string

Canonical hostname with base.

This is useful when your content is deployed in multiple places.

:::

::: info

Check [copyright plugin documentation][copyright] for all available options.

:::

[copyright]: https://ecosystem.vuejs.press/plugins/features/copyright.html#options
