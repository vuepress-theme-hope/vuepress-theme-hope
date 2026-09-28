---
title: Markdown 行为配置
icon: fa7-brands:markdown
order: 1
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

下列选项更改 Markdown 渲染器行为，可以在主题选项中的 **`markdown` 属性**下设置。

<!-- more -->

## 选项 {#options}

:::: fields
@`markdown.gfm` type=boolean

是否支持 [GFM](https://github.github.com/gfm/)。

::: important

只支持常见的 GFM 语法，有些行为可能会有所不同。

例如，为了支持 Vue 语法，VuePress 允许在 `<script>` 标签中使用。

:::

参考：[Markdown → GFM](../../guide/markdown/others.md#gfm) 与 [@vuepress/plugin-markdown-ext → gfm][gfm]。

@`markdown.vPre` type=boolean

是否启用 v-pre 容器。

参考：[v-pre 容器](../../guide/markdown/others.md#v-pre) 与 [@vuepress/plugin-markdown-ext → vPre][vPre]。

@`markdown.breaks` type=boolean gfm=Yes

是否将段落中的 `\n` 转换为 `<br>`。

参考：[@vuepress/plugin-markdown-ext → breaks][breaks]。

@`markdown.linkify` type=boolean gfm=Yes

是否将文本中的 URL 转换为链接。

参考：[@vuepress/plugin-markdown-ext → linkify][linkify]。

@`markdown.cjkFriendly` type=boolean default="自动"

是否启用针对强调标记的 CJK 友好支持。未设置时，会为站点配置中检测到的 CJK 语言（`zh`、`ja`、`ko`）自动启用。

参考：[@vuepress/plugin-markdown-ext → cjkFriendly][cjkFriendly]。

@`markdown.figure` type=boolean

是否将独立的 `<img>` 转换为 `<figure>`。

参考：[Markdown → 图片展示](../../guide/markdown/grammar/image.md#图片展示) 与 [@vuepress/plugin-markdown-image → figure][figure]。

@`markdown.imgLazyload` type=boolean

是否启用图片懒加载。

参考：[Markdown → 图片懒加载](../../guide/markdown/grammar/image.md#图片懒加载) 与 [@vuepress/plugin-markdown-image → lazyload][lazyload]。

@`markdown.highlighter` type=`MarkdownHighlighterOptions | "prismjs" | "shiki" | false` default=`"shiki"`

Markdown 代码块高亮器。可以选择 `"prismjs"`、`"shiki"`、`false` 或一个带有 `type` 字段的对象，声明高亮器名称和其他插件选项。

- `"prismjs"`: 使用 [@vuepress/plugin-prismjs][prismjs]。
- `"shiki"`: 使用 [@vuepress/plugin-shiki][shiki]。
- `false`: 禁用代码块高亮。

参考：[功能 → 代码块](../../guide/markdown/code/fence.md)。

其类型为：

```ts
type MarkdownHighlighterOptions =
  | ({ type: "prismjs" } & PrismjsPluginOptions)
  | ({ type: "shiki" } & ShikiPluginOptions);
```

@`markdown.linksCheck` type=`LinksCheckPluginOptions | boolean` enabled-by-default=Yes default=`true`

是否启用 `@vuepress/plugin-links-check` 插件，提供 Markdown 链接检查。你可以手动设置一个布尔值来控制插件状态，或提供插件选项。

参考：[Markdown → 链接检查](../../guide/markdown/others.md#链接检查) 与 [@vuepress/plugin-links-check][links-check]。

::::

[links-check]: https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html#options
[breaks]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#breaks
[linkify]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#linkify
[gfm]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#gfm
[cjkFriendly]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#cjkFriendly
[figure]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#figure
[lazyload]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#lazyload
[vPre]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#vPre
[prismjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html
