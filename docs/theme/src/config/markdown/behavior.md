---
title: Markdown Behavior Config
icon: b:markdown
order: 1
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options change Markdown renderer behaviors, and can be set **under `markdown` property** in theme options.

<!-- more -->

## markdown.gfm

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → GFM](../../guide/markdown/others.md#gfm)
  - [@vuepress/plugin-markdown-ext → gfm][gfm]

Whether to support [GFM](https://github.github.com/gfm/).

::: important

Only common GFM syntax are supported, and some of the behaviors might be different.

For example, to support Vue syntax, `<script>` tags are allowed
in VuePress.

:::

## markdown.vPre

- Type: `boolean`
- Default: `false`
- Details:
  - [v-pre wrapper](../../guide/markdown/others.md#v-pre)
  - [@vuepress/plugin-markdown-ext → vPre][vPre]

Whether to enable v-pre wrapper.

## markdown.breaks

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [@vuepress/plugin-markdown-ext → breaks][breaks]

Whether convert `\n` in paragraphs into `<br>`s

## markdown.linkify

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [@vuepress/plugin-markdown-ext → linkify][linkify]

Whether convert URL-like text into links

## markdown.figure

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Figure](../../guide/markdown/grammar/image.md#figure)
  - [@vuepress/plugin-markdown-image → figure][figure]

Whether to convert standalone `<img>` into `<figure>`.

## markdown.imgLazyload

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Image Lazy Loading](../../guide/markdown/grammar/image.md#image-lazyload)
  - [@vuepress/plugin-markdown-image → lazyload][lazyload]

Whether to enable lazy loading for images in Markdown.

## markdown.highlighter

- Type: `MarkdownHighlighterOptions | "prismjs" | "shiki" | false`

  ```ts
  type MarkdownHighlighterOptions =
    | ({ type: "prismjs" } & PrismjsPluginOptions)
    | ({ type: "shiki" } & ShikiPluginOptions);
  ```

- Default: `"shiki"`

- Details:
  - [Feature → Code Block](../../guide/markdown/code/fence.md)

Controls Markdown code block highlighter. You can choose `"prismjs"`, `"shiki"`, `false` or an object with `type` field declaring the highlighter name and other plugin options.

- `"prismjs"`: Use [@vuepress/plugin-prismjs][prismjs].
- `"shiki"`: Use [@vuepress/plugin-shiki][shiki].
- `false`: Disable code block highlighting.

## markdown.linksCheck <Badge text="Enabled by default" />

- Type: `LinksCheckPluginOptions | Options`
- Default: `true`
- Details:
  - [Markdown → Link check](../../guide/markdown/others.md#link-check)
  - [@vuepress/plugin-links-check][links-check]

Whether to enable `@vuepress/plugin-links-check` plugin, which provides link check for Markdown. You can manually set a boolean value to control the plugin status, or provide plugin options.

[links-check]: https://ecosystem.vuejs.press/plugins/markdown/links-check.html#options
[breaks]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#breaks
[linkify]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#linkify
[gfm]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#gfm
[figure]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#figure
[lazyload]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#lazyload
[vPre]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#vPre
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html
