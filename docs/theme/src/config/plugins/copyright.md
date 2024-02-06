---
title: Copyright Plugin Config
icon: copyright
order: 6
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

### triggerLength

- Type: `number`
- Default: `100`

Min words triggering copyright append

### global

- Type: `boolean`
- Default: `false`

Whether enabled globally

### disableCopy

- Type: `boolean`
- Default: `false`

Disable copy

### disableSelection

- Type: `boolean`
- Default: `false`

Disable selection

### canonical

- Type: `string`
- Required: No

Canonical hostname with base.

This is useful when your content are deploying in multiple places.

::: info

Check [copyright plugin documentation][copyright] for all available options.

:::

[copyright]: https://ecosystem.vuejs.press/plugins/copyright.html#options
