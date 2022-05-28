---
title: 首页
icon: home
order: 6
category:
  - 布局
tag:
  - 布局
  - 主页
---

`vuepress-theme-hope` 保留了默认主题的首页配置，在此基础上改进样式与配置。

如果想要使用它，请在 frontmatter 中设置 `home: true`。任何 frontmatter 之后的内容将会以普通的 Markdown 被渲染，并插入到主页渲染内容的底部。

![首页截图](./assets/home-light.png#light)
![首页截图](./assets/home-dark.png#dark)

<!-- more -->

## 配置选项

可以配置的 frontmatter 参数如下:

### home

- 类型: `boolean`

设置为 `true` 时启用首页样式

### title

- 类型: `string`
- 必填: 否

设置页面标题，会用于路径导航、页面增强等。

### heroText

- 类型: `string | false`
- 默认值: `"Hello"`

主页标题

### tagline

- 类型: `string | false`
- 默认值: `"Welcome to your VuePress site"`

附加文字描述

### heroImage

- 类型: `string`
- 必填: 否

主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)

### heroImageDark

- 类型: `string`
- 必填: 否

深色模式下主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)，默认同 `heroImage`。

### heroAlt

- 类型: `string`
- 必填: 否

主页图标的替代文字

### actions

- 类型: `ActionConfig | ActionConfig[]`
- 必填: 否

`ActionConfig` 结构:

- `text`: 按钮文字
- `link`: 按钮链接
- `type`: 按钮类型 (仅支持 `"primary"` 与 `"default"` (默认))

### features

- 类型: `Feature[]`
- 必填: 否

`Feature` 结构:

- `title`: `string` 标题
- `details`: `string` 详情
- `icon`(可选): `string` 图标的 FontClass
- `link`(可选): `string` 链接地址

特性说明

## 配置案例

```md
---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: 一个具有强大功能的 vuepress 主题✨
actions:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config/

features:
  - title: Markdown 增强
    icon: markdown
    details: 新增文字对齐、上下角标、脚注、标记、任务列表、数学公式、流程图、图表与幻灯片支持
    link: /zh/guide/markdown/

  - title: 浏览量与评论
    icon: comment
    details: 配合 Waline 来开启阅读量统计与评论支持
    link: /zh/guide/feature/comment/

  - title: 文章信息展示
    icon: info
    details: 为你的文章添加作者、写作日期、预计阅读时间、字数统计等信息
    link: /zh/guide/feature/page-info/

  - title: 博客支持
    icon: blog
    details: 为你的文章添加日期、标签和分类，即可自动生成文章、分类、标签与时间轴列表
    link: /zh/guide/blog/intro/

  - title: 文章加密
    icon: lock
    details: 你可以为你的特定页面或特定目录进行加密，以便陌生人不能随意访问它们
    link: /zh/guide/feature/encrypt/

  - title: 主题色切换
    icon: palette
    details: 支持自定义主题色并允许用户在预设的主题颜色之间切换
    link: /zh/guide/interface/theme-color/

  - title: 深色模式
    icon: contrast
    details: 可以自由切换浅色模式与深色模式
    link: /zh/guide/interface/darkmode/

  - title: SEO 增强
    icon: config
    details: 将最终生成的网页针对搜索引擎进行优化。
    link: /zh/guide/feature/seo/

  - title: Sitemap
    icon: sitemap
    details: 自动为你的网站生成 Sitemap
    link: /zh/guide/feature/sitemap/

  - title: Feed 支持
    icon: rss
    details: 生成你的 Feed，并通知你的用户订阅它
    link: /zh/guide/feature/feed/

  - title: PWA 支持
    icon: mobile
    details: 让你的网站更像一个 APP
    link: /zh/guide/feature/pwa/

  - title: 更多新特性
    icon: more
    details: 包括博客主页、图标支持、路径导航、页脚支持、全屏按钮、返回顶部按钮等
    link: /zh/guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---
```
