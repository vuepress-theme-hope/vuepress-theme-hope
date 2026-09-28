---
title: Markdown Behavior Config
icon: fa7-brands:markdown
order: 1
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options change Markdown renderer behaviors, and can be set **under `markdown` property** in theme options.

<!-- more -->

## Options

:::: fields
@`markdown.gfm` type=boolean

Whether to support [GFM](https://github.github.com/gfm/).

::: important

Only common GFM syntax are supported, and some of the behaviors might be different.

For example, to support Vue syntax, `<script>` tags are allowed
in VuePress.

:::

See also: [Markdown → GFM](../../guide/markdown/others.md#gfm) and [@vuepress/plugin-markdown-ext → gfm][gfm].

@`markdown.vPre` type=boolean

Whether to enable v-pre wrapper.

See also: [v-pre wrapper](../../guide/markdown/others.md#v-pre) and [@vuepress/plugin-markdown-ext → vPre][vPre].

@`markdown.breaks` type=boolean gfm=Yes

Whether to convert `\n` in paragraphs into `<br>`s.

See also: [@vuepress/plugin-markdown-ext → breaks][breaks].

@`markdown.linkify` type=boolean gfm=Yes

Whether to convert URL-like text into links.

See also: [@vuepress/plugin-markdown-ext → linkify][linkify].

@`markdown.cjkFriendly` type=boolean default="Auto"

Whether to enable CJK-friendly support for emphasis marks. When not set, it's automatically enabled for CJK languages (`zh`, `ja`, `ko`) detected in site configuration.

See also: [@vuepress/plugin-markdown-ext → cjkFriendly][cjkFriendly].

@`markdown.figure` type=boolean

Whether to convert standalone `<img>` into `<figure>`.

See also: [Markdown → Figure](../../guide/markdown/grammar/image.md#figure) and [@vuepress/plugin-markdown-image → figure][figure].

@`markdown.imgLazyload` type=boolean

Whether to enable lazy loading for images in Markdown.

See also: [Markdown → Image Lazy Loading](../../guide/markdown/grammar/image.md#image-lazyload) and [@vuepress/plugin-markdown-image → lazyload][lazyload].

@`markdown.highlighter` type=`MarkdownHighlighterOptions | "prismjs" | "shiki" | false` default=`"shiki"`

Controls Markdown code block highlighter. You can choose `"prismjs"`, `"shiki"`, `false` or an object with `type` field declaring the highlighter name and other plugin options.

- `"prismjs"`: Use [@vuepress/plugin-prismjs][prismjs].
- `"shiki"`: Use [@vuepress/plugin-shiki][shiki].
- `false`: Disable code block highlighting.

See also: [Feature → Code Block](../../guide/markdown/code/fence.md).

Its type is:

```ts
type MarkdownHighlighterOptions =
  | ({ type: "prismjs" } & PrismjsPluginOptions)
  | ({ type: "shiki" } & ShikiPluginOptions);
```

@`markdown.linksCheck` type=`LinksCheckPluginOptions | boolean` enabled-by-default=Yes default=`true`

Whether to enable `@vuepress/plugin-links-check` plugin, which provides link check for Markdown. You can manually set a boolean value to control the plugin status, or provide plugin options.

See also: [Markdown → Link check](../../guide/markdown/others.md#link-check) and [@vuepress/plugin-links-check][links-check].

::::

[links-check]: https://ecosystem.vuejs.press/plugins/markdown/links-check.html#options
[breaks]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#breaks
[linkify]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#linkify
[gfm]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#gfm
[cjkFriendly]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#cjkFriendly
[figure]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#figure
[lazyload]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#lazyload
[vPre]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#vPre
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html
