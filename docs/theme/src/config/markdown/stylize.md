---
title: Markdown Stylize Config
icon: fab fa-markdown
order: 3
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options adds new stylize feature, and can be set **under `markdown` property** in theme options.

## markdown.align

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Align](../../guide/markdown/stylize/align.md)
  - [@vuepress/plugin-markdown-stylize → align][align]

Whether to enable custom align.

## markdown.attrs

- Type: `MarkdownItAttrsOptions | boolean`

  ```ts
  interface MarkdownItAttrsOptions {
    /**
     * left delimiter
     *
     * @default '{'
     */
    left?: string;

    /**
     * right delimiter
     *
     * @default '}'
     */
    right?: string;

    /**
     * allowed attributes
     *
     * @description An empty list means allowing all attribute
     *
     * @default []
     */
    allowed?: (string | RegExp)[];
    /**
     * Rules to enable
     *
     * @default "all"
     */
    rule?: "all" | boolean | MarkdownItAttrRuleName[];
  }
  ```

- Default: `false`
- Details:
  - [Markdown → Attrs](../../guide/markdown/stylize/attrs.md)
  - [@vuepress/plugin-markdown-stylize → attrs][attrs]

Whether to enable attribute customize support.

## markdown.mark

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Mark](../../guide/markdown/stylize/mark.md)
  - [@vuepress/plugin-markdown-stylize → mark][mark]

Whether to enable mark support.

## markdown.sup

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Superscript](../../guide/markdown/stylize/sup-sub.md)
  - [@vuepress/plugin-markdown-stylize → sup][sup]

Whether to enable the superscript support.

## markdown.sub

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Subscript](../../guide/markdown/stylize/sup-sub.md)
  - [@vuepress/plugin-markdown-stylize → sub][sub]

Whether to enable subscript support.

## markdown.spoiler

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Spoiler](../../guide/markdown/stylize/spoiler.md)
  - [@vuepress/plugin-markdown-stylize → spoiler][spoiler]

Whether to enable spoiler support.

## markdown.stylize

- Type: `MarkdownItStylizeConfig[] | false`

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

  interface MarkdownItStylizeConfig {
    /**
     * Inline token matcher
     */
    matcher: string | RegExp;
    /**
     * Content Replacer
     */
    replacer: (options: {
      tag: string;
      content: string;
      attrs: Record<string, string>;
      env?: any;
    }) => MarkdownItStylizeResult | null | undefined | void;
  }
  ```

- Default: `false`
- Details:
  - [Markdown → Stylize](../../guide/markdown/stylize/stylize.md)
  - [@vuepress/plugin-markdown-stylize → custom][stylize]

Stylize inline tokens to create snippet you want.

[align]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#align
[attrs]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#attrs
[mark]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#mark
[sup]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#sup
[sub]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#sub
[spoiler]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#spoiler
[stylize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html#custom
