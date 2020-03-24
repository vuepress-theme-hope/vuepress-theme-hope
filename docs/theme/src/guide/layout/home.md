---
icon: homefill
tag:
  - home
  - layout
category: layout
---

# 主页

vuepress-theme-hope 改进了默认主页。

## 项目样式

可以配置的 frontmatter 参数如下:

### home

- 类型: `boolean`

设置为 `true` 时启用主页样式

### title

- 类型: `string`

标题，默认值为 `'Hello'`

### heroImage

- 类型: `string`

主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)

### heroText

- 类型: `string`

主页图标替代文字

### tagline

- 类型: `string`

附加文字，默认为 `'Welcome to your VuePress site'`

### actionText

- 类型: `string`

按钮文字

### actionLink

- 类型: `string`

按钮链接

### features

- 类型：`Array`
- 结构：

  - title: `string` 标题
  - details: `string` 详情
  - link(可选): `string` 链接地址

特性说明

## 博客样式

### hero

- 类型: `boolean`
- 默认: `true`

是否显示主页的图标与描述

### bgImage

- 类型: `string`

背景图片。如果不填写，会自动应用一张默认的风景图片。

### bgImageStyle

- 类型: `Record<string, string>`

背景图片的 CSS 样式。

### heroImageStyle

- 类型: `Record<string, string>`

主页图标的 CSS 样式
