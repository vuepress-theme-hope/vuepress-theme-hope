---
title: 档案 Frontmatter 配置
icon: home
order: 5
category:
  - 配置
tag:
  - Frontmatter
  - 档案
---

## portfolio

必须设置为 `true` 以使用档案页面。

## home

如果档案是主页时推荐设置为 `true`

## name

- 类型: `string`
- 默认值: `themeConfig.author.name`

档案名称，默认为 `themeConfig.author.name` 的值。

## avatar

- 类型: `string`
- 必填: 否

档案头像图片地址，不支持相对路径。

## avatarDark

- 类型: `string`
- 默认值: `avatar`

深色模式下档案头像图片地址，不支持相对路径。

## titles

- 类型: `string[]`
- 必填: 否

档案标题。

## avatarStyle

- 类型: `Record<string, string> | string`
- 必填: 否

档案头像的 CSS 样式

## avatarAlt

- 类型: `string`
- 默认值: `name`

档案头像的 alt 文本

## bgImage

- 类型: `string`
- 必填: 否

档案背景图片地址，不支持相对路径。

## bgImageDark

- 类型: `string`
- 默认值: `bgImage`

深色模式下档案背景图片地址，不支持相对路径。

## bgImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

档案背景图片的 CSS 样式。

## welcome

- 类型: `string`
- 默认值: `'👋 Hi there, I am'`

欢迎语句。

## medias

- 类型: `PortfolioMedia[]`

  ```ts
  interface PortfolioMedia {
    icon: string;
    name: string;
    link: string;
  }
  ```

- 必填: 否

档案媒体信息。

## content

- 类型: `"portfolio" | "doc" | "none"`
- 默认值: `"portfolio"`

档案内容类型。

- `"portfolio"`: 使用档案样式渲染 Markdown 内容
- `"doc"`: 使用文档样式渲染 Markdown 内容
- `"none"`: 不渲染 Markdown 内容
