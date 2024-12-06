---
title: Markdown Config
icon: fab fa-markdown
order: 2
category:
  - Config
tag:
  - Markdown
  - Plugin Config
  - Theme Config
---

You can customize markdown rendering behavior via `markdown` in theme options.

## markdown.gfm

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → GFM](../guide/markdown/others.md#gfm)

Whether to support [GFM](https://github.github.com/gfm/).

::: important

Only common GFM syntax are supported, and some of the behaviors might be different.

For example, to support Vue syntax, `<script>` tags are allowed
in VuePress.

:::

## markdown.footnote

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [Markdown → Footnote](../guide/markdown/content/footnote.md)
  - [@vuepress/plugin-markdown-ext][markdown-ext]

Whether to enable footnote format support.

## markdown.tasklist

- Type: `MarkdownItTaskListOptions | boolean`

  ```ts
  interface MarkdownItTaskListOptions {
    /**
     * Whether disable checkbox
     *
     * @default true
     */
    disabled?: boolean;

    /**
     * Whether use `<label>` to wrap text
     *
     * @default true
     */
    label?: boolean;
  }
  ```

- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [Markdown → Tasklist](../guide/markdown/grammar/tasklist.md)
  - [@vuepress/plugin-markdown-ext][markdown-ext]

Whether to enable tasklist format support. You can pass an object to config task list.

## markdown.component

- Type: `boolean`
- Default: `false`
- Details:
  - [Component → Grammar](../guide/component/grammar.md)
  - [@vuepress/plugin-markdown-ext][markdown-ext]

Whether to enable component support.

## markdown.vPre

- Type: `boolean`
- Default: `false`
- Details:
  - [v-pre wrapper](../guide/markdown/others.md#v-pre)
  - [@vuepress/plugin-markdown-ext][markdown-ext]

Whether to enable v-pre wrapper.

### markdown.align

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Align](../guide/markdown/stylize/align.md)
  - [@vuepress/plugin-markdown-stylize][markdown-stylize]

Whether to enable align support.

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
  - [Markdown → Attrs](../guide/markdown/stylize/attrs.md)
  - [@vuepress/plugin-markdown-stylize][markdown-stylize]

Whether to enable attribute customize support.

## markdown.sup

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Superscript](../guide/markdown/grammar/sup-sub.md)
  - [@vuepress/plugin-markdown-stylize][markdown-stylize]

Whether to enable the upper format support.

## markdown.sub

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Subscript](../guide/markdown/grammar/sup-sub.md)
  - [@vuepress/plugin-markdown-stylize][markdown-stylize]

Whether to enable the lower corner format support.

## markdown.mark

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Mark](../guide/markdown/stylize/mark.md)
  - [@vuepress/plugin-markdown-stylize][markdown-stylize]

Whether to enable mark support.

## markdown.include

- Type: `MarkdownIncludePluginOptions | boolean`

  ```ts
  interface MarkdownIncludePluginOptions {
    /**
     * handle include filePath
     *
     * @default (path) => path
     */
    resolvePath?: (path: string, cwd: string) => string;

    /**
     * Whether deep include files in included Markdown files
     *
     * @default false
     */
    deep?: boolean;
  }
  ```

- Default: `false`
- Details:
  - [Include files](../guide/markdown/content/include.md)

Whether to enable Markdown import support. You can pass in a function for path resolution.

## markdown.highlighter

- Type: `MarkdownHighlighterOptions | "prismjs" | "shiki" | false`

  ```ts
  type MarkdownHighlighterOptions =
    | ({ type: "prismjs" } & PrismjsPluginOptions)
    | ({ type: "shiki" } & ShikiPluginOptions);
  ```

- Default: `"shiki"`

- Details:
  - [Feature → Code Block](../guide/markdown/code/fence.md)

The markdown code block highlighter. You can choose `"prismjs"`, `"shiki"`, `false` or an object with `type` field declaring the highlighter name and other plugin options.

- `prismjs`: Use [@vuepress/plugin-prismjs][prismjs].
- `shiki`: Use [@vuepress/plugin-shiki][shiki].
- `false`: Disable code block highlighting.

[markdown-ext]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html
[markdown-stylize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-stylize.html
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html
