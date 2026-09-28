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

## 选项 {#options}

::: fields
@`portfolio` type=boolean required

是否使用档案布局。

@`home` type=boolean

档案是否为主页。推荐设置为 `true`。

@`name` type=string default=`themeConfig.author.name`

档案名称，默认为主题选项中的作者名。

@`avatar` type=string

档案头像图片地址，不支持相对路径。

@`avatarDark` type=string default=`avatar`

深色模式下档案头像图片地址，不支持相对路径。

@`titles` type=`string[]`

档案标题。

@`avatarStyle` type=`Record<string, string> | string`

档案头像的 CSS 样式。

@`avatarAlt` type=string default=`name`

档案头像的 alt 文本。

@`bgImage` type=string

档案背景图片地址，不支持相对路径。

@`bgImageDark` type=string default=`bgImage`

深色模式下档案背景图片地址，不支持相对路径。

@`bgImageStyle` type=`Record<string, string> | string`

档案背景图片的 CSS 样式。

@`welcome` type=string default=`'👋 Hi there, I am'`

欢迎语句。

@`medias` type=`PortfolioMedia[]`

档案媒体信息。

@@`medias[*].icon` type=string required

媒体的图标。

@@`medias[*].name` type=string required

媒体的名称。

@@`medias[*].link` type=string required

媒体的链接。

@`content` type=`'portfolio' | 'doc' | 'none'` default=`'portfolio'`

档案内容类型:

- `'portfolio'`: 使用档案样式渲染 Markdown 内容
- `'doc'`: 使用文档样式渲染 Markdown 内容
- `'none'`: 不渲染 Markdown 内容

:::
