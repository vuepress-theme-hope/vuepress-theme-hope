---
title: 插件选项
icon: config
---

## id

- 类型: `string`
- 必填: 是

调色板的唯一 ID，用于避免重复注册。

## config

- 类型: `string`
- 默认: `` `.vuepress/styles/${id}-palette.scss` ``

用户配置文件路径，相对于源文件夹。

::: tip

这是用户设置样式变量的文件。

默认路径的文件名拥有上方的 ID 前缀。

:::

## defaultConfig

- 类型: `string`
- 默认: `"vuepress-plugin-sass-palette/styles/default/config.scss"`

默认的配置文件路径，应为绝对路径。

::: tip

这是你应该通过 `!default` 来提供默认样式变量的文件。

:::

## palette

- 类型: `string`
- 默认: `` `.vuepress/styles/${id}-palette.scss` ``

用户的调色板文件路径，相对于源文件夹。

::: tip

这是用户控制注入 CSS 变量的文件。所有的变量会被转换为连字符格式然后被注入。

默认路径的文件名拥有上方的 ID 前缀。

:::

## defaultPalette

- 类型: `string`
- 默认: `"vuepress-plugin-sass-palette/styles/default/palette.scss"`

默认的调色板文件路径，应为绝对路径。

::: tip

这是你应该通过 `!default` 来提供默认调色板值的文件。所有的变量会被转换为连字符格式然后被注入。

:::

## generator

- 类型: `string`
- 必填: 否

自定义的生成器，用于生成调色板配置的衍生值。

如: 你可能想要根据 `$theme-color` 的值提供一个 `$theme-color-light`。

## style

- 类型: `string`
- 必填: 否

用户的样式文件路径，相对于源文件夹。.
