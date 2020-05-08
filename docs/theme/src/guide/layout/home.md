---
icon: homefill
category: layout
tags:
  - home
  - layout
---

# 首页

vuepress-theme-hope 对首页布局进行了一些改进。

如果想要使用它，请在 Front Matter 中设置 `home: true`。任何 `YAML front matter` 之后额外的内容将会以普通的 markdown 被渲染，并插入到 `features` 的后面。

![首页截图](./assets/home.png)

## 配置选项

可以配置的 Front Matter 参数如下:

### home

- 类型: `boolean`

设置为 `true` 时启用首页样式

### title

- 类型: `string | false`
- 默认值: `'Hello'`

标题，填入 `false` 会取消显示。

### heroImage

- 类型: `string`

主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)

### darkHeroImage

- 类型: `string`

深色模式下主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)，默认同 `heroImage`。

### heroText

- 类型: `string`

主页图标替代文字。

### tagline

- 类型: `string`
- 默认值: `'Welcome to your VuePress site'`

附加文字描述

### action

- 类型: `ActionConfig | ActionConfig[]`

`ActionConfig` 结构:

- text: 按钮文字
- link: 按钮链接

### features

- 类型：`Feature[]`

`Feature` 结构：

- title: `string` 标题
- details: `string` 详情
- link(可选): `string` 链接地址

特性说明

## 配置案例

```yaml
---
home: true
title: 博客示例
heroImage: /logo.png
heroText: 博客示例
tagline: 这是一个 Vuepress 搭建的博客
actionText: 了解更多 →
actionLink: /vuepress/
features:
  - title: 简洁至上
    details: Vue 驱动的静态网站生成器，以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: Vue 驱动
    details: 享受 Vue + webpack 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
  - title: 高性能
    details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

```
