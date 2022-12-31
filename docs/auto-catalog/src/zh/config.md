---
title: 选项
icon: config
---

## component

- 类型: `string`
- 默认值: `"AutoCatalog"`

目录组件名称。

## level

- 类型: `1 | 2 | 3`
- 默认值: `3`

目录项级别的最大深度。

::: note

仅在你使用内置目录组件时可用。

:::

## exclude

- 类型: `(RegExp | string)[]`
- 默认值: `[]`

不会自动生成的页面路径。

## frontmatter

- 类型: `(path: string) => Record<string, any>`
- 必填: 否

控制页面 Frontmatter。
