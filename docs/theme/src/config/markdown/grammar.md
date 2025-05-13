---
title: Markdown Grammar Config
icon: b:markdown
order: 2
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options adds new Markdown grammar, and can be set **under `markdown` property** in theme options.

## markdown.component

- Type: `boolean`
- Default: `false`
- Details:
  - [Component → Grammar](../../guide/component/grammar.md)
  - [@vuepress/plugin-markdown-ext → component][component]

Whether to enable component support.

## markdown.footnote

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [Markdown → Footnote](../../guide/markdown/content/footnote.md)
  - [@vuepress/plugin-markdown-ext → footnote][footnote]

Whether to enable footnote format support.

## markdown.imgMark

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Image Mark](../../guide/markdown/grammar/image.md#image-mark)
  - [@vuepress/plugin-markdown-image → mark][mark]

Whether to enable image mark.

## markdown.imgSize

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Image Size](../../guide/markdown/grammar/image.md#image-size)
  - [@vuepress/plugin-markdown-image → size][size]

Whether to enable image size.

## markdown.obsidianImgSize

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Image Size](../../guide/markdown/grammar/image.md#image-size)
  - [@vuepress/plugin-markdown-image → obsidianSize][obsidianSize]

## markdown.legacyImgSize (Deprecated)

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Image Size](../../guide/markdown/grammar/image.md#image-size)
  - [@vuepress/plugin-markdown-image → legacySize][legacySize]

Whether to enable legacy image size.

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
  - [Markdown → Include](../../guide/markdown/content/include.md)
  - [@vuepress/plugin-markdown-include][include]

Whether to enable Markdown import support. You can pass in a object to customize behavior.

## markdown.tabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Markdown → Tabs](../../guide/markdown/content/tabs.md)
  - [@vuepress/plugin-markdown-tab → tabs][tabs]

Whether to enable tabs support.

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
  - [Markdown → Tasklist](../../guide/markdown/grammar/tasklist.md)
  - [@vuepress/plugin-markdown-ext][tasklist]

Whether to enable tasklist format support. You can pass an object to config task list.

## markdown.math

- Type: `MarkdownMathPluginOptions | boolean`

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

  interface MarkdownMathjaxPluginOptions
    extends Omit<MarkdownItMathjaxOptions, "transformer"> {
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
    | MarkdownKatexPluginOptions
    | MarkdownMathjaxPluginOptions;
  ```

- Default: `false`
- Details:
  - [Markdown → Math](../../guide/markdown/grammar/math.md)
  - [@vuepress/plugin-markdown-math][math]

Whether to enable math formula support. You can set `true` to auto detect the installed one of katex/mathjax, or provide plugin options.

## markdown.revealjs

- Type: `RevealJsPluginOptions | boolean`

  ```ts
  type RevealJsPlugin = "highlight" | "math" | "notes" | "search" | "zoom";

  type RevealJsTheme =
    | "auto"
    | "beige"
    | "black"
    | "blood"
    | "league"
    | "moon"
    | "night"
    | "serif"
    | "simple"
    | "sky"
    | "solarized"
    | "white";

  interface RevealJsPluginOptions {
    /**
     * Reveal.js plugins
     *
     * @default []
     */
    plugins?: RevealJsPlugin[];
    /**
     * Reveal.js themes
     *
     * @default ["auto"]
     */
    themes?: RevealJsTheme[];
  }
  ```

- Default: `false`
- Details:
  - [Markdown → Presentation](../../guide/markdown/content/revealjs.md)
  - [@vuepress/plugin-revealjs][revealjs]

Controls `@vuepress/plugin-revealjs` which provides presentation support. You can set `true` to directly enable it, or provide plugin options.

[component]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#component
[footnote]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#footenote
[tasklist]: https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#tasklist
[mark]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#mark
[size]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#size
[obsidianSize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#obsidianSize
[legacySize]: https://ecosystem.vuejs.press/plugins/markdown/markdown-image.html#legacySize
[include]: https://ecosystem.vuejs.press/plugins/markdown/markdown-include.html
[math]: https://ecosystem.vuejs.press/plugins/markdown/markdown-math.html
[revealjs]: https://ecosystem.vuejs.press/plugins/markdown/revealjs/#options
[tabs]: https://ecosystem.vuejs.press/plugins/markdown/markdown-tab.html#tabs
