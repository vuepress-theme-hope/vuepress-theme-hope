---
title: Markdown Grammar Config
icon: fa7-brands:markdown
order: 2
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options adds new Markdown grammar, and can be set **under `markdown` property** in theme options.

## Options

::: fields
@`markdown.component` type=boolean

Whether to enable component support.

See also: [Component → Grammar](../../guide/component/grammar.md) and [@vuepress/plugin-markdown-ext → component][component].

@`markdown.footnote` type=boolean gfm=Yes

Whether to enable footnote format support.

See also: [Markdown → Footnote](../../guide/markdown/content/footnote.md) and [@vuepress/plugin-markdown-ext → footnote][footnote].

@`markdown.imgMark` type=boolean

Whether to enable image mark.

See also: [Markdown → Image Mark](../../guide/markdown/grammar/image.md#image-mark) and [@vuepress/plugin-markdown-image → mark][mark].

@`markdown.imgSize` type=boolean

Whether to enable image size.

See also: [Markdown → Image Size](../../guide/markdown/grammar/image.md#image-size) and [@vuepress/plugin-markdown-image → size][size].

@`markdown.obsidianImgSize` type=boolean

Whether to enable Obsidian image size.

See also: [Markdown → Image Size](../../guide/markdown/grammar/image.md#image-size) and [@vuepress/plugin-markdown-image → obsidianSize][obsidianSize].

@`markdown.legacyImgSize` type=boolean deprecated

Whether to enable legacy image size.

See also: [Markdown → Image Size](../../guide/markdown/grammar/image.md#image-size) and [@vuepress/plugin-markdown-image → legacySize][legacySize].

@`markdown.include` type=`MarkdownIncludePluginOptions | boolean`

Whether to enable Markdown import support. You can pass in an object to customize behavior.

See also: [Markdown → Include](../../guide/markdown/content/include.md) and [@vuepress/plugin-markdown-include][include].

@@`markdown.include.resolvePath` type=`(path: string, cwd: string) => string` default=`(path) => path`

Handle the path of the included file.

@@`markdown.include.deep` type=boolean

Whether to deep include files in included Markdown files.

@`markdown.fields` type=boolean

Whether to enable fields support.

See also: [Markdown → Fields](../../guide/markdown/content/fields.md) and [@vuepress/plugin-markdown-field → fields][fields].

@`markdown.tabs` type=boolean

Whether to enable tabs support.

See also: [Markdown → Tabs](../../guide/markdown/content/tabs.md) and [@vuepress/plugin-markdown-tab → tabs][tabs].

@`markdown.tasklist` type=`MarkdownItTaskListOptions | boolean` gfm=Yes

Whether to enable tasklist format support. You can pass an object to config task list.

See also: [Markdown → Tasklist](../../guide/markdown/grammar/tasklist.md) and [@vuepress/plugin-markdown-ext][tasklist].

@@`markdown.tasklist.disabled` type=boolean default=`true`

Whether to disable checkbox.

@@`markdown.tasklist.label` type=boolean default=`true`

Whether to use `<label>` to wrap text.

@`markdown.math` type=`MarkdownMathPluginOptions | boolean`

Whether to enable math formula support. You can set `true` to auto detect the installed one of katex/mathjax, or provide plugin options.

See also: [Markdown → Math](../../guide/markdown/grammar/math.md) and [@vuepress/plugin-markdown-math][math].

Its type is:

```ts
interface MarkdownKatexPluginOptions extends KatexOptions {
  type?: "katex";

  /**
   * Whether to allow inline math with spaces on ends
   *
   * @description NOT recommended to set this to true, because it will likely break the default usage of $
   *
   * @default false
   */
  allowInlineWithSpace?: boolean;

  /**
   * Whether enable copy plugin
   *
   * @default false
   */
  copy?: boolean;

  /**
   * Whether enable mhchem plugin
   *
   * @default false
   */
  mhchem?: boolean;
}

interface MarkdownMathjaxPluginOptions extends Omit<
  MarkdownItMathjaxOptions,
  "transformer"
> {
  type?: "mathjax";

  /**
   * Whether to allow inline math with spaces on ends
   *
   * @description NOT recommended to set this to true, because it will likely break the default usage of $
   *
   * @default false
   */
  allowInlineWithSpace?: boolean;

  /**
   * Output syntax
   *
   * @default 'svg'
   */
  output?: "chtml" | "svg";

  /**
   * Enable A11y
   *
   * @default true
   */
  a11y?: boolean;

  /**
   * TeX input options
   */
  tex?: MathJaxTexInputOptions;

  /**
   * Common HTML output options
   */
  chtml?: MathjaxCommonHTMLOutputOptions;

  /**
   * SVG output options
   */
  svg?: MathjaxSVGOutputOptions;
}

type MarkdownMathPluginOptions =
  MarkdownKatexPluginOptions | MarkdownMathjaxPluginOptions;
```

@`markdown.revealjs` type=`RevealJsPluginOptions | boolean`

Controls `@vuepress/plugin-revealjs` which provides presentation support. You can set `true` to directly enable it, or provide plugin options.

See also: [Markdown → Presentation](../../guide/markdown/content/revealjs.md) and [@vuepress/plugin-revealjs][revealjs].

@@`markdown.revealjs.plugins` type=`RevealJsPlugin[]` default=`[]`

Built-in reveal.js plugins to enable.

Available values: `highlight`, `math`, `notes`, `search`, `zoom`.

@@`markdown.revealjs.themes` type=`RevealJsTheme[]` default=`["auto"]`

Themes to enable.

Available values: `auto`, `beige`, `black`, `blood`, `league`, `moon`, `night`, `serif`, `simple`, `sky`, `solarized`, `white`.

:::

[component]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#component
[footnote]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#footenote
[tasklist]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#tasklist
[mark]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#mark
[size]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#size
[obsidianSize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#obsidianSize
[legacySize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#legacySize
[include]: https://ecosystem.vuejs.press/plugins/markdown/markdown-include.html
[fields]: https://ecosystem.vuejs.press/plugins/markdown/markdown-field.html#fields
[math]: https://ecosystem.vuejs.press/plugins/markdown/markdown-math.html
[revealjs]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/#options
[tabs]: https://ecosystem.vuejs.press/plugins/markdown/markdown-tab.html#tabs
