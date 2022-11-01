---
title: 其他插件选项
icon: more
order: 8
category:
  - 配置
tag:
  - 插件选项
  - 主题配置
---

## components

注册一些可以在 Markdown 文件中使用的组件，可用的组件名称为:

- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"PDF"`
- `"StackBlitz"`
- `"VideoPlayer"`
- `"YouTube"`

你可以将 `plugin.components` 设置为需要的组件数组，默认情况下为 `["Badge"]`。

## copyCode <Badge text="默认启用" />

控制 `vuepress-plugin-copy-code2`，提供代码复制按钮。

默认情况下，不需要任何配置。如果你不需要这个功能，请设置为 `false`。

::: info

插件选项请参见 [copy-code2 插件选项][copy-code-config]。

:::

## git <Badge text="默认仅限构建模式" />

控制 `@vuepress/plugin-git`，通过 Git 提交历史提供文件信息。

默认情况下，为了提高开发服务器性能仅在构建模式下启用。你可以手动设置一个布尔值控制插件状态，可以设置插件选项。

::: info

插件选项请参见 [git 插件选项][git-config]。

:::

## nprogress <Badge text="默认启用" />

控制 `@vuepress/plugin-nprogress`，通过 nprogress 提供切换页面时的进度条。

默认情况下，主题会启用此插件，你可以设置 `false` 禁用它。

## prismjs <Badge text="默认启用" />

控制 `@vuepress/plugin-prismjs`，通过 PrismJS 提供代码块高亮。

默认情况下，主题会启用此插件，你可以设置 `false` 禁用它并自行高亮代码块。

::: info

插件选项请参见 [prismjs 插件选项][prismjs-config]。

:::

## photoSwipe <Badge text="默认启用" />

控制 `vuepress-plugin-photo-swipe`，提供图片浏览功能。

默认情况下，不需要任何配置。如果你不需要这个功能，请设置为 `false`。

::: info

插件选项请参见 [photo-swipe 插件选项][photo-swipe-config]。

:::

## readingTime <Badge text="默认启用" />

控制 `vuepress-plugin-reading-time2`，为页面进行字数统计并生成预计的阅读时间。

### readingTime.wordPerMinute

- 类型: `number`
- 默认值: `300`

每分钟的阅读字数。

::: info

更多插件选项请参见 [reading-time2 插件文档][reading-time]。

:::

## seo <Badge text="默认启用" />

控制 `vuepress-plugin-seo2`，提供搜索引擎增强。

默认情况下，不需要任何配置。如果你不需要这个功能，请设置为 `false`。

::: info

插件选项请参见 [seo2 插件选项][seo-config]。

:::

## sitemap <Badge text="默认启用" />

控制 `vuepress-plugin-sitemap2`，为网站自动生成 Sitemap。

默认情况下，不需要任何配置。如果你不需要这个功能，请设置为 `false`。

::: info

插件选项请参见 [sitemap2 插件选项][sitemap-config]。

:::

[copy-code-config]: https://vuepress-theme-hope.github.io/v2/copy-code/zh/config.html
[git-config]: https://v2.vuepress.vuejs.org/zh/reference/plugin/git.html
[prismjs-config]: https://v2.vuepress.vuejs.org/zh/reference/plugin/prismjs.html
[photo-swipe-config]: https://vuepress-theme-hope.github.io/v2/photo-swipe/zh/config.html
[reading-time]: https://vuepress-theme-hope.github.io/v2/reading-time/zh/
[seo-config]: https://vuepress-theme-hope.github.io/v2/seo/zh/config.html
[sitemap-config]: https://vuepress-theme-hope.github.io/v2/sitemap/zh/config.html
