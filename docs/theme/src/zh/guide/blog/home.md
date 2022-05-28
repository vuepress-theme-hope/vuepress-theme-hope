---
title: 博客首页
icon: home
order: 6
category:
  - 博客
tag:
  - 博客
  - 主页
  - 布局
---

`vuepress-theme-hope` 允许你启用博客风格的首页。

你需要在相应的页面的 frontmatter 中，设置 `home: true` 和 `layout: Blog` 来使用博客主页。

<!-- more -->

![首页截图](./assets/blog-light.png#light)
![首页截图](./assets/blog-dark.png#dark)

## Frontmatter 选项

### hero

- 类型: `boolean`
- 默认: `true`

是否显示主页的图标与描述。主页的图标、描述设置同 [默认主页](../layout/home.md)。

### bgImage

- 类型: `string | false`

背景图片的地址，需填写绝对路径。如果不填写，会自动应用一张默认的风景图片。

### bgImageStyle

- 类型: `Record<string, string>`

背景图片的 CSS 样式。

### heroImageStyle

- 类型: `Record<string, string>`

首页图标的 CSS 样式

### heroFullScreen

- 类型: `boolean`
- 默认: `false`

是否全屏显示 Hero

### 项目

- 类型: `ProjectOption[]`

`ProjectOption` 包括以下键值:

- `name`: 项目名称，必填
- `link`: 项目链接，必填，填入外部链接或绝对路径。
- `desc`: 项目描述，选填
- `icon`: 图标，可填入完整路径或绝对路径的图片链接、图标 FontClass 等。

  同时提供了如下内置图标支持: `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`
