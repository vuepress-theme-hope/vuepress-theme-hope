---
title: 配置
icon: configuration
---

你可以传递以下选项来启用或禁用一些功能

## baseLang

- 类型: `string`
- 默认值: `'en-US'`

主目录所对应的语言。

## enableAll

- 类型: `boolean`
- 默认值: `false`

启用全部功能。

## align

- 类型: `boolean`
- 默认值: `false`

是否启用自定义对齐格式支持。

## lineNumbers

- 类型: `boolean`
- 默认值: `true`

是否在每个代码块的左侧显示行号。

## sup

- 类型: `boolean`
- 默认值: `false`

是否启用上角标格式支持。

## sub

- 类型: `boolean`
- 默认值: `false`

是否启用下角标格式支持。

## footnote

- 类型: `boolean`
- 默认值: `false`

是否启用脚注格式支持。

## mark

- 类型: `boolean`
- 默认值: `false`

是否启用标记格式支持。

## tex

- 类型: `boolean`
- 默认值: `false`

是否启用 $\TeX$ 语法支持。

## flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用 流程图 语法支持。

## presentation

- 类型: `PresentationOptions | boolean`
- 默认值: `false`

是否启用 幻灯片 语法支持。

你可以传入一个对象，这个对象将用于 reveal.js 配置。

### presentation.plugins

- 类型: `string[]`
- 必填: No

你想启用的 Reveal.js 插件

可接受的插件有:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

### presentation.revealConfig

- 类型: `Partial<RevealOptions>`
- 必填: No

你想要传递给 Reveal.js 的配置选项
