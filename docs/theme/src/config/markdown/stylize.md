---
title: Markdown Stylize Config
icon: fa7-brands:markdown
order: 3
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options adds new stylize feature, and can be set **under `markdown` property** in theme options.

## Options

::: fields
@`markdown.hint` type=boolean default=`true`

Whether to enable hint containers, including important, info, note, tip, warning, caution and details.

See also: [Markdown → Hint box](../../guide/markdown/stylize/hint.md) and [@vuepress/plugin-markdown-hint → hint][hint].

@`markdown.alert` type=boolean

Whether to enable GFM alerts.

See also: [Markdown → GFM alert](../../guide/markdown/stylize/alert.md) and [@vuepress/plugin-markdown-hint → alert][alert].

@`markdown.align` type=boolean

Whether to enable custom align.

See also: [Markdown → Align](../../guide/markdown/stylize/align.md) and [@vuepress/plugin-markdown-stylize → align][align].

@`markdown.attrs` type=`MarkdownItAttrsOptions | boolean`

Whether to enable attribute customize support.

See also: [Markdown → Attrs](../../guide/markdown/stylize/attrs.md) and [@vuepress/plugin-markdown-stylize → attrs][attrs].

@@`markdown.attrs.left` type=string default=`'{'`

Left delimiter.

@@`markdown.attrs.right` type=string default=`'}'`

Right delimiter.

@@`markdown.attrs.allowed` type=`(string | RegExp)[]` default=`[]`

Allowed attributes. An empty list means allowing all attributes.

@@`markdown.attrs.rule` type=`"all" | boolean | MarkdownItAttrRuleName[]` default=`"all"`

Rules to enable, where `MarkdownItAttrRuleName` is one of `"fence"`, `"inline"`, `"table"`, `"list"`, `"hr"`, `"softbreak"` and `"block"`.

@`markdown.layout` type=boolean

Whether to enable layout support.

See also: [Markdown → Layout](../../guide/markdown/stylize/layout.md) and [@vuepress/plugin-markdown-stylize → layout][layout].

@`markdown.mark` type=boolean

Whether to enable mark support.

See also: [Markdown → Mark](../../guide/markdown/stylize/mark.md) and [@vuepress/plugin-markdown-stylize → mark][mark].

@`markdown.sup` type=boolean

Whether to enable the superscript support.

See also: [Markdown → Superscript](../../guide/markdown/stylize/sup-sub.md) and [@vuepress/plugin-markdown-stylize → sup][sup].

@`markdown.sub` type=boolean

Whether to enable subscript support.

See also: [Markdown → Subscript](../../guide/markdown/stylize/sup-sub.md) and [@vuepress/plugin-markdown-stylize → sub][sub].

@`markdown.spoiler` type=boolean

Whether to enable spoiler support.

See also: [Markdown → Spoiler](../../guide/markdown/stylize/spoiler.md) and [@vuepress/plugin-markdown-stylize → spoiler][spoiler].

@`markdown.steps` type=boolean

Whether to enable steps support.

See also: [Markdown → Steps](../../guide/markdown/stylize/steps.md) and [@vuepress/plugin-markdown-stylize → steps][steps].

@`markdown.stylize` type=`MarkdownItStylizeConfig[] | false`

Stylize inline tokens to create snippet you want.

See also: [Markdown → Stylize](../../guide/markdown/stylize/stylize.md) and [@vuepress/plugin-markdown-stylize → custom][stylize].

@@`markdown.stylize[*].matcher` type=`string | RegExp`

Inline token matcher.

@@`markdown.stylize[*].replacer` type=`(options: { tag: string; content: string; attrs: Record<string, string>; env?: any }) => MarkdownItStylizeResult | null | undefined | void`

Content replacer. `MarkdownItStylizeResult` is:

```ts
interface MarkdownItStylizeResult {
  /**
   * Tag name
   */
  tag: string;
  /**
   * Attributes settings
   */
  attrs: Record<string, string>;
  /**
   * Tag content
   */
  content: string;
}
```

:::

[align]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#align
[alert]: https://ecosystem.vuejs.press/plugins/markdown/markdown-hint.html#alert
[hint]: https://ecosystem.vuejs.press/plugins/markdown/markdown-hint.html#hint
[attrs]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#attrs
[layout]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#layout
[mark]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#mark
[sup]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#sup
[sub]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#sub
[spoiler]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#spoiler
[steps]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#steps
[stylize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#custom
