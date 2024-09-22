---
title: 其他插件选项
icon: ellipsis
order: -1
category:
  - 配置
tag:
  - 插件选项
  - 主题配置
---

## catalog <Badge text="默认启用" />

控制 `@vuepress/plugin-catalog`，提供目录的自动生成。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [catalog 插件文档][catalog-config]。

## backToTop <Badge text="默认启用" />

控制 `@vuepress/plugin-back-to-top`，提供返回顶部按钮。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [back-to-top 插件文档][back-to-top-config]。

## components

控制 `vuepress-plugin-components`，为 Markdown 提供一组组件。

可以在 Markdown 中使用的可用组件为:

- ArtPlayer: 由 ArtPlayer 驱动的视频播放器。
- Badge: 多彩的徽章组件
- BiliBili: 嵌入 BiliBili 视频
- CodePen: 嵌入 CodePen 演示
- FontIcon: 字体图标组件。
- PDF: 嵌入 PDF 查看器
- Share: 通过社交媒体分享当前页面
- StackBlitz: 嵌入 StackBlitz 演示
- SiteInfo: 显示站点
- VPBanner: 一个横幅组件
- VPCard: 一个卡片组件
- VidStack: 由 VidStack 驱动的音频/视频播放器
- XiGua: 嵌入 XiGua 视频

你可以将 `plugins.components.components` 设置为需要的组件数组，默认情况下为 `["Badge"]`。

插件选项请参阅 <ProjectLink name="components" path="/zh/config.html">components 插件文档</ProjectLink>。

## copyCode <Badge text="默认启用" />

控制 `@vuepress/plugin-copy-code`，提供代码复制按钮。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [copy-code 插件文档][copy-code-config]。

## git <Badge text="默认仅限构建模式" />

控制 `@vuepress/plugin-git`，通过 Git 提交历史提供文件信息。

默认情况下，为了提高开发服务器性能仅在构建模式下启用。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

插件选项请参阅 [git 插件文档][git-config]。

## linksCheck <Badge text="默认启用" />

控制 `@vuepress/plugin-links-check`，提供 Markdown 链接检查。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

插件选项请参阅 [links-check 插件文档][links-check-config]。

## markdownHint <Badge text="默认启用" />

控制 `@vuepress/plugin-markdown-hint`，提供 Markdown 提示容器。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

默认情况下启用提示容器，你可以设置 `false` 禁用插件。

插件选项请参阅 [markdown-hint 插件文档][markdown-hint-config]。

## markdownImage <Badge text="默认启用" />

控制 `@vuepress/plugin-markdown-image`，提供 Markdown 图片增强。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

默认情况下启用懒加载和 figure 转换，你可以设置 `false` 禁用插件。

插件选项请参阅 [markdown-image 插件文档][markdown-image-config]。

## markdownMath

控制 `@vuepress/plugin-markdown-math`，提供 Markdown 中的数学支持。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

设置为 `true` 意味着使用默认配置的 Katex。

插件选项请参阅 [markdown-math 插件文档][markdown-math-config]。

## markdownTab

控制 `@vuepress/plugin-markdown-tab`，提供 Markdown 中的数学支持。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

设置 `true` 意味着启用两个功能。

插件选项请参阅 [markdown-tab 插件文档][markdown-tab-config]。

## nprogress <Badge text="默认启用" />

控制 `@vuepress/plugin-nprogress`，通过 `nprogress` 提供切换页面时的进度条。

默认情况下，主题会启用此插件，你可以设置 `false` 禁用它。

## prismjs

控制 `@vuepress/plugin-prismjs`，通过 PrismJS 提供代码块高亮。

插件选项请参阅 [prismjs 插件文档][prismjs-config]。

## photoSwipe <Badge text="默认启用" />

控制 `@vuepress/plugin-photo-swipe`，提供图片浏览功能。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [photo-swipe 插件文档][photo-swipe-config]。

## pwa

控制 `@vuepress/plugin-pwa`，提供 PWA 功能。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

插件选项请参阅 [pwa 插件文档][pwa-config]。

## readingTime <Badge text="默认启用" />

控制 `@vuepress/plugin-reading-time`，为页面进行字数统计并生成预计的阅读时间。

插件选项请参阅 [reading-time 插件文档][reading-time-config]。

## revealjs

控制 `@vuepress/plugin-revealjs`，提供幻灯片功能。

插件选项请参阅 [revealjs 插件文档][revealjs-config]。

## seo <Badge text="默认启用" />

控制 `@vuepress/plugin-seo`，提供搜索引擎增强。默认情况选无需额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [seo 插件文档][seo-config]。

## sitemap <Badge text="默认启用" />

控制 `@vuepress/plugin-sitemap`，为网站自动生成 Sitemap。默认情况选无需额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [sitemap 插件文档][sitemap-config]。

## watermark

控制 `@vuepress/plugin-watermark`，为网站生成水印。

插件选项请参阅 [watermark 插件文档][watermark-config]。

[back-to-top-config]: https://ecosystem.vuejs.press/zh/plugins/back-to-top.html#options
[catalog-config]: https://ecosystem.vuejs.press/zh/plugins/features/catalog.html#options
[copy-code-config]: https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html#options
[git-config]: https://ecosystem.vuejs.press/zh/plugins/development/git.html#options
[links-check-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html#options
[markdown-hint-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-hint.html#options
[markdown-image-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#options
[markdown-math-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html#options
[markdown-tab-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-tab.html#options
[photo-swipe-config]: https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html#options
[prismjs-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html#options
[pwa-config]: https://ecosystem.vuejs.press/zh/plugins/pwa/pwa/config.html#options
[reading-time-config]: https://ecosystem.vuejs.press/zh/plugins/development/reading-time.html#options
[revealjs-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/#options
[seo-config]: https://ecosystem.vuejs.press/zh/plugins/seo/seo/config.html
[sitemap-config]: https://ecosystem.vuejs.press/zh/plugins/seo/sitemap/config.html
[watermark-config]: https://ecosystem.vuejs.press/zh/plugins/features/watermark.html
