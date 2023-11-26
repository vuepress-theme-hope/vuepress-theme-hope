---
title: 小白常问
icon: fab
category:
  - FAQ
---

## 如何设置toc的标题深度

[toc标题深度设置](/guide/layout/page.html#标题列表)

有几处设置的地方：

- 一个是 config markdown [headers](/guide/layout/page.html#标题列表) 的提取级别 (默认2)。
  该配置为 [vuepress自身的配置](https://vuejs.press/zh/reference/config.html#markdown-headers)
- 一个是 theme [headerDepth](/config/frontmatter/layout.html#headerdepth) 或 frontmatter [headerDepth](/config/frontmatter/layout.html#headerdepth)，分别控制全局和单篇的渲染级别。<br>
  需要注意的是，如果标题深度提取不足，这里设置更大的渲染级别也是没用的，需要先对标题提取级别进行设置
- 一个是 theme [toc](/config/theme/layout.html#toc-heading) 或 frontmatter [toc](/config/frontmatter/layout.html#toc-heading)，分别设置全局和单篇的TOC显示开关
