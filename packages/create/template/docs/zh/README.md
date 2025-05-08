---
home: true
icon: house
title: 项目主页
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: 项目名称
tagline: 你可以在这里放置或是整个项目的描述。
actions:
  - text: 使用指南
    icon: lightbulb
    link: ./demo/
    type: primary

  - text: 文档
    link: ./guide/

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
    features:
      - title: 链接检查
        icon: clipboard-check
        details: 检查 Markdown 链接
        link: https://theme-hope.vuejs.press/zh/guide/markdown/others.html#link-check

      - title: 提示容器
        icon: box-archive
        details: 用样式装饰 Markdown 内容
        link: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/hint.html

      - title: GFM 警告
        icon: bell
        details: GFM 风格的警告容器
        link: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/alert.html

      - title: 选项卡
        icon: table-columns
        details: 使用选项卡对相似内容进行分组
        link: https://theme-hope.vuejs.press/zh/guide/markdown/content/tabs.html

      - title: 代码组
        icon: code
        details: 使用选项卡对相似代码进行分组
        link: https://theme-hope.vuejs.press/zh/guide/markdown/code/code-tabs.html

      - title: 自定义对齐
        icon: align-center
        details: Markdown 中对内容进行自定义对齐
        link: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/align.html

      - title: 自定义属性
        icon: code
        details: 为 Markdown 元素添加属性
        link: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/attrs.html

      - title: 上下角标
        icon: superscript
        details: 轻松在 Markdown 中添加上下角标
        link: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/sup-sub.html

      - title: 脚注
        icon: quote-left
        details: 在内容中插入脚注
        link: https://theme-hope.vuejs.press/zh/guide/markdown/content/footnote.html

      - title: 标记
        icon: highlighter
        details: 标记并高亮内容
        link: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/mark.html

      - title: 剧透
        icon: eraser
        details: 添加剧透标记支持
        link: https://theme-hope.vuejs.press/zh/guide/markdown/stylize/spoiler.html

      - title: 任务列表
        icon: square-check
        details: 轻松插入任务列表
        link: https://theme-hope.vuejs.press/zh/guide/markdown/grammar/tasklist.html

      - title: 图片语法
        icon: image
        details: 使用改进的语法指定图片大小与颜色模式
        link: https://theme-hope.vuejs.press/zh/guide/markdown/grammar/image.html

      - title: 组件支持
        icon: puzzle-piece
        details: 在 Markdown 中轻松插入组件
        link: https://theme-hope.vuejs.press/zh/guide/component/grammar.html

      - title: 组件
        icon: puzzle-piece
        details: 开箱即用的常用组件
        link: https://theme-hope.vuejs.press/zh/guide/component/built-in.html

      - title: Chart.js 支持
        icon: chart-simple
        details: 在 Markdown 中展示 Chart.js 图表
        link: https://theme-hope.vuejs.press/zh/guide/markdown/chart/chartjs.html

      - title: 流程图支持
        icon: route
        details: 在 Markdown 中直接写出流程图
        link: https://theme-hope.vuejs.press/zh/guide/markdown/chart/flowchart.html

      - title: Mermaid 支持
        icon: chart-pie
        details: 在 Markdown 中添加 Mermaid 图例
        link: https://theme-hope.vuejs.press/zh/guide/markdown/chart/mermaid.html

      - title: Plantuml 支持
        icon: diagram-project
        details: 在 Markdown 中添加 Plant UML 图表
        link: https://theme-hope.vuejs.press/zh/guide/markdown/chart/plantuml.html

      - title: Tex 支持
        icon: square-root-variable
        details: Markdown 现在也可以支持 Tex 语法以显示公式
        link: https://theme-hope.vuejs.press/zh/guide/markdown/grammar/math.html

      - title: 导入文件支持
        icon: fa6-brands:markdown
        details: 将你的文档分段，并在 Markdown 中导入
        link: https://theme-hope.vuejs.press/zh/guide/markdown/content/include.html

      - title: 交互演示支持
        icon: code
        details: 你可以在 Markdown 中添加交互演示
        link: https://theme-hope.vuejs.press/zh/guide/markdown/code/playground.html

      - title: Kotlin 交互演示支持
        icon: fa6-brands:kickstarter
        details: 响应式的 Kotlin 演示
        link: https://theme-hope.vuejs.press/zh/guide/markdown/code/kotlin-playground.html

      - title: Vue 交互演示支持
        icon: fa6-brands:vuejs
        details: 在交互演示中展示 Vue 组件
        link: https://theme-hope.vuejs.press/zh/guide/markdown/code/vue-playground.html

      - title: Sandpack 交互演示支持
        icon: code
        details: Sandpack 驱动的实时的编码环境
        link: https://theme-hope.vuejs.press/zh/guide/markdown/code/sandpack.html

      - title: 代码案例支持
        icon: laptop-code
        details: 你可以很方便的插入代码案例
        link: https://theme-hope.vuejs.press/zh/guide/markdown/code/demo.html

      - title: 幻灯片支持
        icon: person-chalkboard
        details: 通过 Reveal.js 在 Markdown 中插入幻灯片
        link: https://theme-hope.vuejs.press/zh/guide/markdown/content/revealjs.html

  - header: 可定制的页面
    description: 完整无障碍支持的可定制外观
    image: /assets/image/ui.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/9-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/9-dark.svg
    highlights:
      - title: 深色模式
        icon: circle-half-stroke
        details: 可以自由切换浅色模式与深色模式
        link: https://theme-hope.vuejs.press/zh/guide/interface/darkmode.html

      - title: 主题色切换
        icon: palette
        details: 支持自定义主题色并允许用户在预设的主题颜色之间切换
        link: https://theme-hope.vuejs.press/zh/guide/interface/theme-color.html

      - title: 更多
        icon: ellipsis
        details: RTL 布局，打印支持，全局按钮等
        link: https://theme-hope.vuejs.press/zh/guide/interface/others.html

  - header: 布局
    description: 一个完美的响应式布局。
    image: /assets/image/layout.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: 导航栏
        icon: window-maximize
        details: 完全可定制的导航栏以及改进的移动端外观
        link: https://theme-hope.vuejs.press/zh/guide/layout/navbar.html

      - title: 侧边栏
        icon: fas fa-window-maximize fa-rotate-270
        details: 从文档标题或文件结构中自动生成侧边栏
        link: https://theme-hope.vuejs.press/zh/guide/layout/sidebar.html

      - title: 幻灯片页面
        icon: person-chalkboard
        details: 添加幻灯片页面以显示你喜欢的内容
        link: https://theme-hope.vuejs.press/zh/guide/layout/slides.html

      - title: 布局增强
        icon: object-group
        details: 添加路径导航、页脚、改进的导航栏、改进的页面导航等。
        link: https://theme-hope.vuejs.press/zh/guide/layout/

      - title: 更多
        icon: ellipsis
        details: RTL 布局，打印支持，全局按钮等
        link: https://theme-hope.vuejs.press/zh/guide/interface/others.html

  - header: 新功能
    image: /assets/image/features.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    features:
      - title: 目录页面
        icon: network-wired
        details: 自动生成目录页以及开箱即用的目录组件
        link: https://theme-hope.vuejs.press/zh/guide/feature/catalog.html

      - title: 浏览量与评论
        icon: comment-dots
        details: 配合 4 个评论服务开启阅读量统计与评论支持
        link: https://theme-hope.vuejs.press/zh/guide/feature/comment.html

      - title: 文章信息
        icon: circle-info
        details: 为你的文章添加作者、写作日期、预计阅读时间、字数统计等信息
        link: https://theme-hope.vuejs.press/zh/guide/feature/page-info.html

      - title: 文章加密
        icon: lock
        details: 你可以为你的特定页面或特定目录进行加密，以便陌生人不能随意访问它们
        link: https://theme-hope.vuejs.press/zh/guide/feature/encrypt.html

      - title: 搜索支持
        icon: search
        details: 支持 docsearch 和基于客户端的搜索
        link: https://theme-hope.vuejs.press/zh/guide/feature/search.html

      - title: 代码块
        icon: code
        details: 自定义代码块主题、行号、行高亮、复制按钮等
        link: https://theme-hope.vuejs.press/zh/guide/markdown/code/fence.html

      - title: 图片预览
        icon: image
        details: 像相册一样允许你浏览、缩放并分享你的页面图片
        link: https://theme-hope.vuejs.press/zh/guide/feature/photo-swipe.html

  - header: 博客
    description: 通过主题创建个人博客
    image: /assets/image/blog.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: 博客功能
        icon: blog
        details: 通过文章的日期、标签和分类展示文章
        link: https://theme-hope.vuejs.press/zh/guide/blog/intro.html

      - title: 博客主页
        icon: house
        details: 全新博客主页
        link: https://theme-hope.vuejs.press/zh/guide/blog/home.html

      - title: 博主信息
        icon: circle-info
        details: 自定义名称、头像、座右铭和社交媒体链接
        link: https://theme-hope.vuejs.press/zh/guide/blog/blogger.html

      - title: 时间线
        icon: clock
        details: 在时间线中浏览和通读博文
        link: https://theme-hope.vuejs.press/zh/guide/blog/timeline.html

  - header: 高级
    description: 增强站点与用户体验的高级功能
    image: /assets/image/advanced.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: SEO 增强
        icon: dumbbell
        details: 将最终生成的网页针对搜索引擎进行优化。
        link: https://theme-hope.vuejs.press/zh/guide/advanced/seo.html

      - title: Sitemap
        icon: sitemap
        details: 自动为你的网站生成 Sitemap
        link: https://theme-hope.vuejs.press/zh/guide/advanced/sitemap.html

      - title: Feed 支持
        icon: rss
        details: 生成你的 Feed，并通知你的用户订阅它
        link: https://theme-hope.vuejs.press/zh/guide/advanced/feed.html

      - title: PWA 支持
        icon: mobile-screen
        details: 让你的网站更像一个 APP
        link: https://theme-hope.vuejs.press/zh/guide/advanced/pwa.html

copyright: false
footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-至今 Mr.Hope
---

这是项目主页的案例。你可以在这里放置你的主体内容。

想要使用此布局，你需要在页面 front matter 中设置 `home: true`。

配置项的相关说明详见 [项目主页配置](https://theme-hope.vuejs.press/zh/guide/layout/home.html)。
