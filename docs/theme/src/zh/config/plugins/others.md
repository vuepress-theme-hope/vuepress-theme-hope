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

- `"ArtPlayer"`
- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"FontIcon"`
- `"PDF"`
- `"Share"`
- `"StackBlitz"`
- `"VPBanner"`
- `"VPCard"`
- `"VidStack"`
- `"SiteInfo"`
- `"XiGua"`

你可以将 `plugins.components.components` 设置为需要的组件数组，默认情况下为 `["Badge"]`。

插件选项请参阅 <ProjectLink name="components" path="/zh/config.html">components 插件文档</ProjectLink>。

## copyCode <Badge text="默认启用" />

控制 `@vuepress/plugin-copy-code`，提供代码复制按钮。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [copy-code 插件文档][copy-code-config]。

## git <Badge text="默认仅限构建模式" />

控制 `@vuepress/plugin-git`，通过 Git 提交历史提供文件信息。

默认情况下，为了提高开发服务器性能仅在构建模式下启用。你可以手动设置一个布尔值控制插件状态，可以设置插件选项。

插件选项请参阅 [git 插件文档][git-config]。

## linksCheck <Badge text="默认启用" />

控制 `@vuepress/plugin-links-check`，提供 Markdown 链接检查。

你可以手动设置一个布尔值控制插件状态，可以设置插件选项。

插件选项请参阅 [links-check 插件文档][links-check-config]。

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

控制 `@vuepress/plugin-pwa`，提供 PWA 功能。

可以直接设置为 `true` 启用。

插件选项请参阅 [pwa 插件文档][pwa-config]。

## readingTime <Badge text="默认启用" />

控制 `@vuepress/plugin-reading-time`，为页面进行字数统计并生成预计的阅读时间。

### readingTime.wordPerMinute

- 类型: `number`
- 默认值: `300`

每分钟的阅读字数。

插件选项请参阅 [reading-time 插件文档][reading-time-config]。

## seo <Badge text="默认启用" />

控制 `@vuepress/plugin-seo`，提供搜索引擎增强。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [seo 插件文档][seo-config]。

## sitemap <Badge text="默认启用" />

控制 `@vuepress/plugin-sitemap`，为网站自动生成 Sitemap。

默认不需要任何额外配置。如果你不需要此功能可设置为 `false`。

插件选项请参阅 [sitemap 插件文档][sitemap-config]。

## watermark

控制 `@vuepress/plugin-watermark`，为网站生成水印。

插件选项请参阅 [watermark 插件文档][watermark-config]。

[back-to-top-config]: https://ecosystem.vuejs.press/zh/plugins/back-to-top.html#options
[catalog-config]: https://ecosystem.vuejs.press/zh/plugins/features/catalog.html#options
[copy-code-config]: https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html#options
[git-config]: https://ecosystem.vuejs.press/zh/plugins/development/git.html#options
[links-check-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html#options
[photo-swipe-config]: https://ecosystem.vuejs.press/zh/plugins/features/photo-swipe.html#options
[prismjs-config]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html#options
[pwa-config]: https://ecosystem.vuejs.press/zh/plugins/pwa/pwa/config.html#options
[reading-time-config]: https://ecosystem.vuejs.press/zh/plugins/development/reading-time.html#options
[seo-config]: https://ecosystem.vuejs.press/zh/plugins/seo/seo/config.html
[sitemap-config]: https://ecosystem.vuejs.press/zh/plugins/seo/sitemap/config.html
[watermark-config]: https://ecosystem.vuejs.press/zh/plugins/features/watermark.html
