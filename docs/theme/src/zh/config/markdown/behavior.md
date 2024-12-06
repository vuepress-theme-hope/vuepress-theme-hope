---
title: Markdown 行为配置
icon: fab fa-markdown
order: 1
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

下列选项更改 Markdown 渲染器行为，可以在主题选项中的 **`markdown` 属性**下设置。

<!-- more -->

## markdown.markdown.gfm

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → GFM](../../guide/markdown/others.md#gfm)
  - [@vuepress/plugin-markdown-ext → gfm][gfm]

是否支持 [GFM](https://github.github.com/gfm/)。

::: important

只支持常见的 GFM 语法，有些行为可能会有所不同。

例如，为了支持 Vue 语法，VuePress 允许在 `<script>` 标签中使用。

:::

## markdown.markdown.vPre

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [v-pre 容器](../../guide/markdown/others.md#v-pre)
  - [@vuepress/plugin-markdown-ext → vPre][vPre]

## markdown.markdown.breaks

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [@vuepress/plugin-markdown-ext → breaks][breaks]

是否将段落中的 `\n` 转换为 `<br>`。

## markdown.markdown.linkify

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [@vuepress/plugin-markdown-ext → linkify][linkify]

是否将文本中的 URL 转换为链接。

## markdown.markdown.figure

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 图片展示](../../guide/markdown/grammar/image.md#图片展示)
  - [@vuepress/plugin-markdown-image → figure][figure]

是否将独立的 `<img>` 转换为 `<figure>`。

## markdown.markdown.imgLazyload

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 图片懒加载](../../guide/markdown/grammar/image.md#图片懒加载)
  - [@vuepress/plugin-markdown-image → lazyload][lazyload]

是否启用图片懒加载。

## markdown.markdown.highlighter

- 类型: `MarkdownHighlighterOptions | "prismjs" | "shiki" | false`

  ```ts
  type MarkdownHighlighterOptions =
    | ({ type: "prismjs" } & PrismjsPluginOptions)
    | ({ type: "shiki" } & ShikiPluginOptions);
  ```

- 默认值: `"shiki"`

- 详情:
  - [功能 → 代码块](../../guide/markdown/code/fence.md)

Markdown 代码块高亮器。可以选择 `"prismjs"`、`"shiki"`、`false` 或一个带有 `type` 字段的对象，声明高亮器名称和其他插件选项。

- `"prismjs"`: 使用 [@vuepress/plugin-prismjs][prismjs]。
- `"shiki"`: 使用 [@vuepress/plugin-shiki][shiki]。
- `false`: 禁用代码块高亮。

## markdown.linksCheck <Badge text="默认启用" />

- 类型: `LinksCheckPluginOptions | Options`
- 默认值: `true`
- 详情:
  - [Markdown → 链接检查](../../guide/markdown/others.md#链接检查)
  - [@vuepress/plugin-links-check][links-check]

是否启用 `@vuepress/plugin-links-check` 插件，提供 Markdown 链接检查。您可以手动设置一个布尔值来控制插件状态，或提供插件选项。

[links-check]: https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html#options
[breaks]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#breaks
[linkify]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#linkify
[gfm]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#gfm
[figure]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#figure
[lazyload]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#lazyload
[vPre]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#vPre
[prismjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html
