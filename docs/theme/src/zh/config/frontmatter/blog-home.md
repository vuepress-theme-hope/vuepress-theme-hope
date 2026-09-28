---
title: 博客主页 Frontmatter 配置
icon: blog
order: 6
category:
  - 配置
tag:
  - Frontmatter
  - 博客主页
---

## 选项 {#options}

::: fields
@`home` type=`true` required

必须设置为 `true` 以使用博客主页布局。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`layout` type=`'Blog'` required

必须设置为 `Blog` 以使用博客主页布局。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`hero` type=boolean default=`true`

是否显示主页的图标与描述。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`title` type=string

页面标题，会用于路径导航、页面增强等。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`heroText` type=string default="站点标题"

主页标题。设置为空字符串可隐藏默认标题。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`tagline` type=string

主页的简短描述。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`heroImage` type=string

主页图标 (logo) 地址。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)、[常见问题 → 配置中的链接](../../faq/common-question.md#links-in-config)。

@`heroImageDark` type=string default=`heroImage`

深色模式下主页图标 (logo) 地址。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)、[常见问题 → 配置中的链接](../../faq/common-question.md#links-in-config)。

@`heroImageStyle` type=`Record<string, string> | string`

主页图标 (logo) 的 CSS 样式。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`heroAlt` type=string

主页图标的替代文字。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`bgImage` type=`string | false` default="一张内置风景图片"

背景图片的地址，不支持相对路径。如果不填写，会自动应用一张默认的风景图片。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)、[常见问题 → 配置中的链接](../../faq/common-question.md#links-in-config)。

@`bgImageDark` type=string default=`bgImage`

深色模式下背景图片的地址，不支持相对路径。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)、[常见问题 → 配置中的链接](../../faq/common-question.md#links-in-config)。

@`bgImageStyle` type=`Record<string, string> | string`

背景图片的 CSS 样式。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`heroFullScreen` type=boolean

是否全屏显示 Hero。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@`projects` type=`ThemeBlogHomeProjectOptions[]`

播客主页中的项目列表。

参考：[博客 → 博客主页](../../guide/blog/home.md#blog-style-homepage)。

@@`projects[*].name` type=string required

项目名称。

@@`projects[*].desc` type=string

项目描述。

@@`projects[*].link` type=string required

项目链接。

@@`projects[*].icon` type=string

项目图标。支持图片链接或图标字体类，同时也支持 `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`。

:::
