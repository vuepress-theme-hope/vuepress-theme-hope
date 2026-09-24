---
home: true
title: 功能项目主页
icon: home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: VuePress Theme Hope
tagline: 一个具有强大功能的 vuepress 主题✨
actions:
  - text: 快速上手
    link: /zh/get-started/
    icon: signs-post
    type: primary

  - text: 指南
    icon: lightbulb
    link: /zh/guide/

  - text: 案例
    icon: star
    link: /zh/demo/

features:
  - title: Markdown 增强
    icon: fa7-brands:markdown
    details: 新增文字对齐、上下角标、脚注、标记、任务列表、数学公式、流程图、图表与幻灯片支持
    link: /zh/guide/markdown/

  - title: 幻灯片页面
    icon: person-chalkboard
    details: 添加幻灯片页面以显示你喜欢的内容
    link: /zh/guide/layout/slides

  - title: 布局增强
    icon: object-group
    details: 添加路径导航、页脚、改进的导航栏、改进的页面导航等。
    link: /zh/guide/layout/

  - title: 浏览量与评论
    icon: comment-dots
    details: 配合 Waline 来开启阅读量统计与评论支持
    link: /zh/guide/feature/comment.html

  - title: 文章信息
    icon: circle-info
    details: 为你的文章添加作者、写作日期、预计阅读时间、字数统计等信息
    link: /zh/guide/feature/page-info.html

  - title: 博客支持
    icon: blog
    details: 使用一些很棒的布局提供博客功能，通过文章的日期、标签和分类，自动生成文章、分类、标签与时间轴列表
    link: /zh/guide/blog/intro.html

  - title: 主题色切换
    icon: palette
    details: 支持自定义主题色并允许用户在预设的主题颜色之间切换
    link: /zh/guide/interface/theme-color.html

  - title: 深色模式
    icon: circle-half-stroke
    details: 可以自由切换浅色模式与深色模式
    link: /zh/guide/interface/darkmode.html

  - title: 文章加密
    icon: lock
    details: 你可以为你的特定页面或特定目录进行加密，以便陌生人不能随意访问它们
    link: /zh/guide/feature/encrypt.html

  - title: 搜索支持
    icon: search
    details: 支持 docsearch 和基于客户端的搜索
    link: /zh/guide/feature/search.html

  - title: 图片预览
    icon: image
    details: 像相册一样允许你浏览、缩放并分享你的页面图片
    link: /zh/guide/feature/photo-swipe.html

  - title: SEO 增强
    icon: dumbbell
    details: 将最终生成的网页针对搜索引擎进行优化。
    link: /zh/guide/advanced/seo.html

  - title: Sitemap
    icon: sitemap
    details: 自动为你的网站生成 Sitemap
    link: /zh/guide/advanced/sitemap.html

  - title: Feed 支持
    icon: rss
    details: 生成你的 Feed，并通知你的用户订阅它
    link: /zh/guide/advanced/feed.html

  - title: PWA 支持
    icon: mobile-screen
    details: 让你的网站更像一个 APP
    link: /zh/guide/advanced/pwa.html

  - title: 更多新特性
    icon: ellipsis
    details: 包括图标支持、全屏按钮、返回顶部按钮等
    link: /zh/guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 🛠 安装

在当前目录下的 `<dir>` 文件夹内创建 vuepress-theme-hope 项目:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope <dir>
```

@tab npm

```bash
npm init vuepress-theme-hope@latest <dir>
```

:::

要将 vuepress-theme-hope 作为文档构建器添加到现有项目中，请在项目根目录中运行以下命令:

::: code-tabs#shell

@tab pnpm

```bash
pnpm create vuepress-theme-hope add <dir>
```

@tab npm

```bash
npm init vuepress-theme-hope@latest add <dir>
```

:::

## 🚀 使用

```ts twoslash title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  // 站点选项
  // ...

  theme: hopeTheme({
    // 主题选项
    // ...
  }),
};
```

## 官方 QQ 群

- [点击加入](https://jq.qq.com/?_wv=1027&k=rATJyxGK) (群号: 1003437555)

<!-- markdownlint-disable -->
