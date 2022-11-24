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

## 站点信息

你可以使用 `heroText` 设置主标题，并通过 `tagline` 设置副标题。

如果你有一个 Logo，你可以将其放置在 `public` 文件夹中，并通过 `heroImage` 设置它，如果你在夜间模式希望展示另一个 Logo， 可以使用 `heroImageDark`。为了更好的 A11y，我们建议你设置 Logo 的描述到 `heroAlt`。

## 主页按钮

你可以将一些重要的链接以按钮的形式展示在主页中。

你可以通过 `actions` 设置它们，它是一个数组，每个元素都是一个对象，包含以下键值:

- `text`: 按钮文字
- `link`: 按钮链接
- `type`: 按钮类型 (仅支持 `"primary"` 与 `"default"` (默认))

## 项目特性

你可以通过 `features` 设置并展示项目特性，它是一个数组，每个元素都是一个对象，包含以下键值:

- `title`: 标题
- `details`: 详情
- `icon`(可选): 可填入完整路径或绝对路径的图片链接，或 FontClass
- `link`(可选): 链接地址

::: info

关于完整的配置项目，请参见 [主页 Frontmatter 配置](../../config/frontmatter/home.md)。

:::

## 配置案例

```md
---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: VuePress Theme Hope
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
