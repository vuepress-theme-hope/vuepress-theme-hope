---
title: 插件说明
icon: circle-info
order: 1
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 介绍
---

`vuepress-theme-hope` 会调用很多 VuePress 插件。

- 一些插件会自动启用，如果你不需要，可以在主题选项中将其禁用;
- 一些插件只有你在进行必要配置后才会启用。

::: note

作为 [VuePress Org](https://github.com/orgs/vuepress/people) 的成员之一，Mr.Hope 开发了很多 VuePress 插件。

`vuepress-theme-hope` 调用的所有插件均为官方插件或托管在 `vuepress-theme-hope` 仓库下由 Mr.Hope 自己开发的插件。

- 官方插件的文档详见 [VuePress2 官网][vuepress]
- Mr.Hope 自己开发的插件也全部拥有自己的文档，可以搭配其他主题使用。

:::

<!-- more -->

## 插件选项

主题提供 `plugins` 选项向对应的插件传递所需选项。

::: info 插件选项名称

所有的配置键名均为插件名称的驼峰式 (camelCase) 版本，并去除名称中可能存在的数字 2 结尾。

例如:

- `vuepress-plugin-copy-code2` 的配置键名为 `copyCode`。
- `vuepress-plugin-md-enhance` 的配置键名为 `mdEnhance`

:::

## 插件列表

### Mr.Hope 提供的插件

- <ProjectLink name="auto-catalog" path="/zh/">vuepress-plugin-auto-catalog</ProjectLink>: VuePress2 的目录自动生成插件

- <ProjectLink name="blog2" path="/zh/">vuepress-plugin-blog2</ProjectLink>: VuePress2 的博客插件

- <ProjectLink name="comment2" path="/zh/">vuepress-plugin-comment2</ProjectLink>: 提供评论与浏览量功能

- <ProjectLink name="components" path="/zh/">vuepress-plugin-components</ProjectLink>: 提供一些开箱即用的插件

- <ProjectLink name="copy-code2" path="/zh/">vuepress-plugin-copy-code2</ProjectLink>: 提供一键复制代码块功能。

- <ProjectLink name="copyright2" path="/zh/">vuepress-plugin-copyright2</ProjectLink>: 在用户复制时追加版权信息，或禁用站点的复制与选择。

- <ProjectLink name="feed2" path="/zh/">vuepress-plugin-feed2</ProjectLink>: Feed 支持

- <ProjectLink name="md-enhance" path="/zh/">vuepress-plugin-md-enhance</ProjectLink>: 提供更多 Markdown 语法

- <ProjectLink name="photo-swipe" path="/zh/">vuepress-plugin-photo-swipe</ProjectLink>: 基于 Photo Swipe 的图片浏览插件

- <ProjectLink name="pwa2" path="/zh/">vuepress-plugin-pwa2</ProjectLink>: 增强的 PWA 支持

- <ProjectLink name="reading-time2" path="/zh/">vuepress-plugin-reading-time2</ProjectLink>: 阅读时间与字数统计

- <ProjectLink name="sass-palette" path="/zh/">vuepress-plugin-sass-palette</ProjectLink>: 面向全部插件和主题的 Sass 配置插件

- <ProjectLink name="seo2" path="/zh/">vuepress-plugin-seo2</ProjectLink>: SEO 增强插件

- <ProjectLink name="sitemap2" path="/zh/">vuepress-plugin-sitemap2</ProjectLink>: Sitemap 插件

::: tip

这里还有一些其他没有被主题捆绑的插件，你可以根据自己的需求自行启用。

- <ProjectLink name="lightgallery" path="/zh/">vuepress-plugin-lightgallery</ProjectLink>: 基于 lightgallery 图片浏览插件

- <ProjectLink name="redirect" path="/zh/">vuepress-plugin-redirect</ProjectLink>: 重定向插件

- <ProjectLink name="remove-pwa" path="/zh/">vuepress-plugin-remove-pwa</ProjectLink>: 移除 PWA 插件

- <ProjectLink name="search-pro" path="/zh/">vuepress-plugin-search-pro</ProjectLink>: 客户端搜索插件

:::

### 官方插件

- [@vuepress/plugin-active-header-links][active-header-links]: 自动更新路由 Hash

- [@vuepress/plugin-container][container]: 自定义容器

- [@vuepress/external-link-icon][external-link-icon]: 为 Markdown 的外部链接添加外部链接图标。

- [@vuepress/plugin-git][git]: 基于 Git 的信息插件

- [@vuepress/plugin-nprogress][nprogress]: 进度条

- [@vuepress/plugin-prismjs][prismjs]: 基于 prism.js 的代码高亮插件

- [@vuepress/plugin-theme-data][theme-data]: 主题配置的 Composition API 插件

[active-header-links]: https://vuejs.press/zh/reference/plugin/active-header-links.html
[container]: https://vuejs.press/zh/reference/plugin/container.html
[external-link-icon]: https://vuejs.press/zh/reference/plugin/external-link-icon.html
[git]: https://vuejs.press/zh/reference/plugin/git.html
[nprogress]: https://vuejs.press/zh/reference/plugin/nprogress.html
[prismjs]: https://vuejs.press/zh/reference/plugin/prismjs.html
[theme-data]: https://vuejs.press/zh/reference/plugin/theme-data.html
[vuepress]: https://vuejs.press/zh/
