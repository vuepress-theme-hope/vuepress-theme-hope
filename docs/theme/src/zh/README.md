---
home: true
title: 主页
icon: home
heroImage: /logo.svg
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: VuePress Theme Hope
tagline: 一个具有强大功能的 vuepress 主题✨
actions:
  - text: 使用教程 🧭
    link: /zh/cookbook/tutorial/
    type: primary

  - text: 介绍 💡
    link: /zh/guide/get-started/intro.html

  - text: 配置 🛠
    link: /zh/config/

  - text: 在线案例 🪀
    link: https://stackblitz.com/fork/vuepress-theme-hope

highlights:
  - header: 易于安装
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: 运行 <code>pnpm create vuepress-theme-hope hope-project</code> 以创建一个新的主题项目。
      - title: 在已有项目根目录下运行 <code>pnpm create vuepress-theme-hope add .</code> 以在项目中添加主题。

  - header: 在 Markdown 中添加你想要的内容
    description: 我们扩展了标准的 CommonMark 规范，为你添加了成吨功能。
    image: /assets/image/markdown.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    highlights:
      - title: 标记内容
        icon: highlighter
        details: 自定义容器，属性，高亮和样式化支持

      - title: 文章创作
        icon: feather
        details: 自定义对齐，角标，片段导入和新的图片格式支持

      - title: 丰富你的内容
        icon: star
        details: Tex，幻灯片，选项卡，上下角标，任务列表和卡片支持

      - title: 插入图表
        icon: chart-simple
        details: Chart.js, ECharts, 流程图和 Mermaid 支持

      - title: 展示你的代码和工作
        icon: lightbulb
        details: 代码选项卡，在线演示，代码交互和 Vue Playground。

  - header: 布局
    description: 一个带有完整无障碍支持的响应式布局。
    image: /assets/image/layout.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: 布局增强
        icon: object-group
        details: 添加路径导航、页脚、改进的导航栏、改进的页面导航等。
        link: /zh/guide/layout/

      - title: 深色模式
        icon: circle-half-stroke
        details: 可以自由切换浅色模式与深色模式
        link: /zh/guide/interface/darkmode.html

      - title: 主题色切换
        icon: palette
        details: 支持自定义主题色并允许用户在预设的主题颜色之间切换
        link: /zh/guide/interface/theme-color.html

      - title: 幻灯片页面
        icon: person-chalkboard
        details: 添加幻灯片页面以显示你喜欢的内容
        link: /zh/guide/layout/slides

      - title: 更多
        icon: ellipsis
        details: RTL 布局，打印支持，全局按钮等
        link: /guide/interface/others.html

  - header: 新功能
    image: /assets/image/features.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    highlights:
      - title: 浏览量与评论
        icon: comment-dots
        details: 配合 Waline 来开启阅读量统计与评论支持
        link: /zh/guide/feature/comment.html

      - title: 文章信息
        icon: circle-info
        details: 为你的文章添加作者、写作日期、预计阅读时间、字数统计等信息
        link: /zh/guide/feature/page-info.html

      - title: 文章加密
        icon: lock
        details: 你可以为你的特定页面或特定目录进行加密，以便陌生人不能随意访问它们
        link: /zh/guide/feature/encrypt.html

      - title: 搜索支持
        icon: search
        details: 支持 docsearch 和基于客户端的搜索
        link: /zh/guide/feature/search.html

      - title: 代码复制
        icon: copy
        details: 一键复制代码块中的代码
        link: /zh/guide/feature/copy-code.html

      - title: 图片预览
        icon: image
        details: 像相册一样允许你浏览、缩放并分享你的页面图片
        link: /zh/guide/feature/photo-swipe.html

  - header: 博客
    description: 通过主题创建个人博客
    image: /assets/image/blog.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: 博客功能
        icon: blog
        details: 通过文章的日期、标签和分类展示文章
        link: /zh/guide/blog/intro.html

      - title: 博客主页
        icon: home
        details: 全新播客主页
        link: /zh/guide/blog/home.html

      - title: 博主信息
        icon: home
        details: 自定义名称、头像、座右铭和社交媒体链接
        link: /zh/guide/blog/blogger.html

      - title: 时间线
        icon: home
        details: 在时间线中浏览和通读博文
        link: /zh/guide/blog/timeline.html

  - header: 高级
    description: 增强站点与用户体验的高级功能
    image: /assets/image/advanced.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
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

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

<NetlifyBadge alt="通过 Netlify 部署" />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
