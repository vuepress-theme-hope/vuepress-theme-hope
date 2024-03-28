---
title: MdEnhance Plugin Config
icon: fab fa-markdown
order: 2
category:
  - Config
tag:
  - Markdown
  - Plugin Config
  - Theme Config
---

## Intro

The theme can enhance Markdown syntax via `vuepress-plugin-md-enhance`, and by default, the theme will enable linkCheck and hint feature.

You can set the following options with `plugins.mdEnhance` in theme options.

## Plugin Options

The theme passes `plugins.mdEnhance` in theme options as plugin options to `vuepress-plugin-md-enhance` plugin.

### gfm

- Type: `boolean`
- Default: `false`

Whether to support full GFM syntax.

::: note

For full GFM syntax, see [GFM](https://github.github.com/gfm/).

Honestly, we do not 100% implement GFM, we only supply its common syntax.

Some of the behavior might be different, for example to support Vue syntax, we are not disallowing `<script>` tags. But in most situation, the behavior should be same.

:::

### hint

- Type: `boolean`
- Default: `false`
- Details:
  - [Hint box](../../guide/markdown/stylize/hint.md)

Whether to enable hint box including

- info
- note
- tip
- warning
- caution
- details

### vPre

- Type: `boolean`
- Default: `false`
- Details:
  - [v-pre wrapper](../../guide/markdown/others.md#v-pre)

Whether to enable v-pre wrapper.

### breaks

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes

Whether convert `\n` in paragraphs into `<br>`s

### linkify

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes

Whether convert URL-like text into links

### alert

- Type: `boolean`
- Default: `false`
- Details:
  - [GFM Alerts](../../guide/markdown/stylize/alert.md)

Whether to enable gfm alerts.

### tabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Tabs](../../guide/markdown/content/tabs.md)

Whether to enable tabs.

### codetabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Code Tabs](../../guide/markdown/code/code-tabs.md)

Whether to enable codetabs.

### align

- Type: `boolean`
- Default: `false`
- Details:
  - [Align](../../guide/markdown/stylize/align.md)

Whether to enable custom align.

### attrs

- Type: `AttrsOptions | boolean`

  ```ts
  interface AttrsOptions {
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
  }
  ```

- Default: `false`
- Details:
  - [Attrs](../../guide/markdown/stylize/attrs.md)

Whether to enable attribute customize support.

### sup

- Type: `boolean`
- Default: `false`
- Details:
  - [Superscript](../../guide/markdown/grammar/sup-sub.md)

Whether to enable the upper format support.

### sub

- Type: `boolean`
- Default: `false`
- Details:
  - [Subscript](../../guide/markdown/grammar/sup-sub.md)

Whether to enable the lower corner format support.

### footnote

- Type: `boolean`
- Default: `false`
- Details:
  - [Footnote](../../guide/markdown/content/footnote.md)

Whether to enable footnote format support.

### mark

- Type: `boolean`
- Default: `false`
- Details:
  - [Mark](../../guide/markdown/stylize/mark.md)

Whether to enable mark support.

### figure

- Type: `boolean`
- Default: `false`

Whether enable figure support.

### imgLazyload

- Type: `boolean`
- Default: `false`

Whether to lazy load every image in page in native way.

### imgMark

- Type: `ImageMarkOptions | boolean`
- Default: `false`

Whether enable image mark support.

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[];
  /** darkmode only IDs */
  dark?: string[];
}
```

### imgSize

- Type: `boolean`
- Default: `false`

Whether enable image size support.

### obsidianImgSize

- Type: `boolean`
- Default: `false`

Whether enable obsidian image size support.

### tasklist

- Type: `TaskListOptions | boolean`
- Default: `false`

Whether to enable tasklist format support. You can pass an object to config task list.

```ts
interface TaskListOptions {
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

### katex

- Type: `KatexOptions & { copy?: boolean; mhchem?: boolean } | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support through KaTeX. You can pass an object to config KaTeX.

In particular, you can enable the copy and mhchem extensions with `katex.copy: true` and `katex.mhchem: true`.

Please see [Katex Docs](https://katex.org/docs/options.html) for available options.

### mathjax

- Type: `MathJaxOptions | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support through Math Jax. You can pass an object to config Math Jax.

Please see [source code](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/md-enhance/src/shared/mathjax.ts) for available options.

### include

- Type: `IncludeOptions | boolean`

  ```ts
  interface IncludeOptions {
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

Whether to enable Markdown import support. You can pass in a function for path resolution.

### component

- Type: `boolean`
- Default: `false`

Whether to enable component support

### chart

- Type: `boolean`
- Default: `false`

Whether to enable chart support

### echarts

- Type: `boolean`
- Default: `false`

Whether to enable ECharts support

### flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart support

### mermaid

- Type: `MermaidConfig | boolean`
- Default: `false`

Whether to enable [Mermaid](https://mermaid.js.org/) support, you can pass in a config object to customize the behavior of Mermaid.

### stylize

- Type: `StylizeOptions | false`

  ```ts
  interface StylizeResult {
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

  interface StylizeItem {
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
      env?: MarkdownEnv;
    }) => StylizeResult | void;
  }

  type StylizeOptions = StylizeItem[];
  ```

- Default: `false`

Stylize inline tokens to create snippet you want.

### playground

- Type: `PlaygroundGlobalOptions`

  ```ts
  interface PlaygroundCodeConfig {
    /**
     * Code block extension
     *
     * @description It's based on filename, not code fence language
     */
    ext: string;

    /** Code block content */
    content: string;
  }

  interface PlaygroundData {
    /** Title of Playground */
    title?: string;

    /**
     * Import map file name
     *
     * @default "import-map.json"
     */
    importMap?: string;

    /** Playground files info */
    files: Record<
      /** File name */
      string,
      /** File detail */
      PlaygroundCodeConfig
    >;

    /**
     * Playground settings
     *
     * @description It's parsed result of json content after setting directive
     */
    settings: Record<string, unknown>;

    /** hash key based on playground content */
    key: string;
  }

  interface PlaygroundOptions {
    /** Playground container name */
    name: string;

    /**
     * Playground component name
     *
     * @default "Playground"
     */
    component?: string;

    /**
     * Props getter
     */
    propsGetter: (data: PlaygroundData) => Record<string, string>;
  }

  interface TSPresetPlaygroundOptions extends CompilerOptions {
    /**
     * external playground service url
     *
     * @default "https://www.typescriptlang.org/play"
     */
    service?: string;
  }

  interface VuePresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * @default "https://sfc.vuejs.org/"
     */
    service?: string;

    /**
     * Whether to use dev version
     *
     * @default false
     */
    dev?: boolean;

    /**
     * Whether to enable SSR
     *
     * @default false
     */
    ssr?: boolean;
  }

  interface UnoPresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * @default "https://unocss.dev/play"
     */
    service?: string;
  }

  type BuiltInPlaygroundPreset = "ts" | "vue" | "unocss";

  interface PlaygroundGlobalOptions {
    /** Playground presets */
    presets: (BuiltInPlaygroundPreset | PlaygroundOptions)[];
    /** Playground config */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
      unocss?: UnoPresetPlaygroundOptions;
    };
  }
  ```

- Required: No

Playground options.

### vuePlayground

- Type: `boolean`

- Default: `false`

Whether to enable vue playground support.

### sandpack

- Type: `boolean`
- Default: `false`

Whether to enable sandpack playground support.

### demo

- Type: `CodeDemoGlobalOptions | boolean`
- Default: `false`

Whether to enable code demo support.

#### demo.jsLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle requires an external JS library for dating.

#### demo.cssLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle need an external CSS library for dating.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head`.

:::

### revealJs

- Type: `RevealJsOptions | boolean`

  ```ts
  type RevealJsPlugin = "highlight" | "math" | "search" | "notes" | "zoom";

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

  /**
   * reveal.js options
   */
  interface RevealJsOptions {
    /**
     * reveal.js plugins
     *
     * @default []
     */
    plugins?: RevealJsPlugin[];

    /**
     * reveal.js themes
     *
     * @default ["auto"]
     */
    themes?: RevealJsTheme[];
  }
  ```

- Default: `false`

Whether to enable slides support. You can pass an option to control plugins and themes to import.

::: info

Check <ProjectLink name="md-enhance" path="/config/">md-enhance plugin documentation</ProjectLink> for all available options.

:::
