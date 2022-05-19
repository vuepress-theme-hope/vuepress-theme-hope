---
title: Plugin Options
icon: config
---

## id

- Type: `string`
- Required: Yes

Identifier for palette, used to avoid duplicate registration.

## config

- Type: `string`
- Default: `` `.vuepress/styles/${id}-palette.scss` ``

User config file path, relative to source dir.

::: tip

This is the file where user set style variables.

The default filename is starting with ID above.

:::

## defaultConfig

- Type: `string`
- Default: `"vuepress-plugin-sass-palette/styles/default/config.scss"`

Default config file path, should be absolute path.

::: tip

This is the file you should use to provide default values with `!default`.

:::

## palette

- Type: `string`
- Default: `` `.vuepress/styles/${id}-palette.scss` ``

User palette file path, relative to source dir.

::: tip

This is the file where user control injected CSS variables. All the variables will be converted in to kebab-case and injected.

The default filename is starting with ID above.

:::

## defaultPalette

- Type: `string`
- Default: `"vuepress-plugin-sass-palette/styles/default/palette.scss"`

Default palette file path, should be absolute path.

::: tip

This is the file you should use to provide default CSS variables with `!default`. All the variable will be converted in to kebab-case and injected.

:::

## generator

- Type: `string`
- Required: No

Custom generator, used to generate derivative values with the above config.

E.g.: You may want to provide a `$theme-color-light` based on `$theme-color`.

## style

- Type: `string`
- Required: No

User style file path, relative to source dir.
