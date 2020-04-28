---
icon: homefill
tags:
  - home
  - layout
category: layout
---

# 主页

vuepress-theme-hope 改进了默认主页。

![主页截图](./assets/home.png)

## 项目样式

可以配置的 frontmatter 参数如下:

### home

- 类型: `boolean`

设置为 `true` 时启用主页样式

### title

- 类型: `string | false`

标题，默认值为 `'Hello'`，填入 `false` 会取消显示。

### heroImage

- 类型: `string`

主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)

### heroText

- 类型: `string`

主页图标替代文字。

### tagline

- 类型: `string`
- 默认值: `'Welcome to your VuePress site'`

附加文字描述

### actionText

- 类型: `string`

按钮文字

### actionLink

- 类型: `string`

按钮链接

### features

- 类型：`Feature[]`

`Feature` 结构：

- title: `string` 标题
- details: `string` 详情
- link(可选): `string` 链接地址

特性说明
