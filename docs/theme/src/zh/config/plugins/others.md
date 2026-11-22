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

## 选项 {#options}

:::: fields
@`backToTop` enabled-by-default=Yes

控制 `@vuepress/plugin-back-to-top`，提供返回顶部按钮。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [back-to-top 插件文档][back-to-top-config]。

@`catalog` enabled-by-default=Yes

控制 `@vuepress/plugin-catalog`，提供目录的自动生成。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [catalog 插件文档][catalog-config]。

@`components`

控制 `vuepress-plugin-components`，为 Markdown 提供一组组件。

可以在 Markdown 中使用的可用组件为:

- Badge: 多彩的徽章组件
- CodePen: 嵌入 CodePen 演示
- StackBlitz: 嵌入 StackBlitz 演示
- SiteInfo: 显示站点
- VPBanner: 一个横幅组件
- VPCard: 一个卡片组件

你可以将 `plugins.components.components` 设置为需要的组件数组，默认情况下为 `["Badge"]`。

插件选项请参阅 <ProjectLink name="components" path="/zh/config.html">components 插件文档</ProjectLink>。

::: tip

媒体组件已迁移至 [`@vuepress/plugin-media`](https://ecosystem.vuejs.press/zh/plugins/features/media.html)（`plugins.media`），分享组件已迁移至 [`@vuepress/plugin-share`](https://ecosystem.vuejs.press/zh/plugins/features/share.html)（`plugins.share`）。

:::

@`copyCode` enabled-by-default=Yes

控制 `@vuepress/plugin-copy-code`，提供代码复制按钮。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [copy-code 插件文档][copy-code-config]。

@`git` enabled-in-production=Yes

控制 `@vuepress/plugin-git`，通过 Git 提交历史提供文件信息。

默认情况下，为了提高开发服务器性能仅在构建模式下启用。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

插件选项请参阅 [git 插件文档][git-config]。

@`media`

控制 `@vuepress/plugin-media`，提供嵌入视频、音频与 PDF 文档的组件。

默认不启用，你需要设置 `plugins.media` 并传入插件选项来启用它。

插件选项请参阅 [media 插件文档][media-config]，使用方法请参阅 [媒体](../../guide/feature/media.md)。

@`nprogress` enabled-by-default=Yes

控制 `@vuepress/plugin-nprogress`，通过 `nprogress` 提供切换页面时的进度条。

默认情况下，主题会启用此插件，你可以设置 `false` 禁用它。

@`photoSwipe` enabled-by-default=Yes

控制 `@vuepress/plugin-photo-swipe`，提供图片浏览功能。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [photo-swipe 插件文档][photo-swipe-config]。

@`pwa`

控制 `@vuepress/plugin-pwa`，提供 PWA 功能。你可以手动设置一个布尔值控制插件状态，或提供插件选项。

插件选项请参阅 [pwa 插件文档][pwa-config]。

@`readingTime` enabled-by-default=Yes

控制 `@vuepress/plugin-reading-time`，为页面进行字数统计并生成预计的阅读时间。

插件选项请参阅 [reading-time 插件文档][reading-time-config]。

@@`readingTime.wordPerMinute` type=number default=`300`

阅读速度 (每分钟阅读词数)。

@`redirect` enabled-by-default=Yes

控制 `@vuepress/plugin-redirect`，提供重定向支持。

主题的默认选项为 `{ switchLocale: 'modal' }`，你可以设置 `false` 禁用它。

插件选项请参阅 [redirect 插件文档][redirect-config]。

@`seo` enabled-by-default=Yes

控制 `@vuepress/plugin-seo`，提供搜索引擎增强。

默认情况下无需额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [seo 插件文档][seo-config]。

@`share`

控制 `@vuepress/plugin-share`，为页面提供分享按钮。

该插件默认不启用。将 `plugins.share` 设为 `true` 可使用默认分享服务启用它，或传入插件选项来使用自定义配置。设置为 `false` 可保持禁用。

插件选项请参阅 [share 插件文档][share-config]，使用方法请参阅 [分享](../../guide/feature/share.md)。

@`sitemap` enabled-by-default=Yes

控制 `@vuepress/plugin-sitemap`，为网站自动生成 Sitemap。

默认情况下无需额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [sitemap 插件文档][sitemap-config]。

@`watermark`

控制 `@vuepress/plugin-watermark`，为网站生成水印。

插件选项请参阅 [watermark 插件文档][watermark-config]。

::::

[back-to-top-config]: https://ecosystem.vuejs.press/zh/plugins/back-to-top.html#选项
[catalog-config]: https://ecosystem.vuejs.press/zh/plugins/features/catalog.html#选项
[copy-code-config]: https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html#选项
[git-config]: https://ecosystem.vuejs.press/zh/plugins/development/git.html#选项
[media-config]: https://ecosystem.vuejs.press/zh/plugins/features/media.html#选项
[photo-swipe-config]: https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html#选项
[pwa-config]: https://ecosystem.vuejs.press/zh/plugins/pwa/pwa/config.html#选项
[reading-time-config]: https://ecosystem.vuejs.press/zh/plugins/development/reading-time.html#选项
[redirect-config]: https://ecosystem.vuejs.press/zh/plugins/tools/redirect.html#选项
[seo-config]: https://ecosystem.vuejs.press/zh/plugins/seo/seo/config.html
[share-config]: https://ecosystem.vuejs.press/zh/plugins/features/share.html#选项
[sitemap-config]: https://ecosystem.vuejs.press/zh/plugins/seo/sitemap/config.html
[watermark-config]: https://ecosystem.vuejs.press/zh/plugins/features/watermark.html
