---
title: Config
icon: gears
---

You can pass these options to the plugin:

## gfm

- Type: `boolean`
- Default: `false`

Whether to support full GFM syntax.

::: note

For full GFM syntax, see [GFM](https://github.github.com/gfm/).

We are not 100% supporting it to be honestly, we only supply it’s syntax including footnote, tasklist, code highlight, image mark and so on.

Some of the behavior might be different, for example to support Vue syntax, we are not disallowing `<script>` tags. But in most situation, the behavior should be same.

:::

## container

- Type: `boolean`
- Default: `false`
- Details:
  - [Custom Container](./guide/container.md)

Whether to enable custom container including

- info
- note
- tip
- warning
- danger
- details

::: warning

The last 4 items conflict with default theme and will override it’s style.

:::

## linkCheck

- Type: `"always" | "dev" | "build" | "never" | boolean`
- Default: `"dev"`

Whether to enable link check.

::: note

- `true` equals to `'always'`
- `false` equals to `'never'`

:::

## vPre

- Type: `boolean`
- Default: `false`
- Details:
  - [v-pre wrapper](./guide/others.md#v-pre)

Whether to enable v-pre wrapper.

## tabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Tabs](./guide/tabs.md)

Whether to enable tabs.

## codetabs

- Type: `boolean`
- Default: `false`
- Details:
  - [Code Tabs](./guide/code-tabs.md)

Whether to enable codetabs.

## align

- Type: `boolean`
- Default: `false`
- Details:
  - [Align](./guide/align.md)

Whether to enable custom align.

## attrs

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
  - [Attrs](./guide/attrs.md)

Whether to enable attribute customize support.

## sup

- Type: `boolean`
- Default: `false`

Whether to enable the upper format support.

## sub

- Type: `boolean`
- Default: `false`

Whether to enable the lower corner format support.

## footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support.

## mark

- Type: `boolean`
- Default: `false`

Whether to enable mark support.

## figure

- Type: `boolean`
- Default: `false`

Whether enable figure support.

## imgLazyload

- Type: `boolean`
- Default: `false`

Whether to lazy load every images in page in native way.

## imgMark

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

## imgSize

- Type: `boolean`
- Default: `false`

Whether enable image size support.

## obsidianImgSize

- Type: `boolean`
- Default: `false`

Whether enable obsidian image size support.

## tasklist

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

## katex

- Type: `KatexOptions & { mhchem?: boolean } | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support through KaTeX. You can pass an object to config KaTeX.

In particular, you can enable the mhchem extension with `katex.mhchem: true`.

Please see [Katex Docs](https://katex.org/docs/options.html) for available options.

## mathjax

- Type: `MathJaxOptions | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support through Math Jax. You can pass an object to config Math Jax.

Please see [source code](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/md-enhance/src/shared/mathjax.ts) for available options.

## include

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

## chart

- Type: `boolean`
- Default: `false`

Whether to enable chart support

## echarts

- Type: `boolean`
- Default: `false`

Whether to enable ECharts support

## flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart support

## mermaid

- Type: `MermaidConfig | boolean`
- Default: `false`

Whether to enable [Mermaid](https://mermaid.js.org/) support.

## stylize

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

## playground

- Type: `PlaygroundGlobalOptions`

  ```ts
  import type { CompilerOptions } from "typescript";

  interface PlaygroundCodeConfig {
    /**
     * Code block extension
     *
     * @description It's based on filename, not code fence language
     */
    ext: string;

    /**
     * Code block content
     */
    content: string;
  }

  interface PlaygroundData {
    /**
     * Title of Playground
     */
    title?: string;

    /**
     * Import map file name
     *
     * @default 'import-map.json'
     */
    importMap?: string;

    /**
     * Playground files info
     */
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

    /**
     * hash key based on playground content
     */
    key: string;
  }

  interface PlaygroundOptions {
    /**
     * Playground container name
     */
    name: string;

    /**
     * Playground component name
     *
     * @default 'Playground'
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

  interface PlaygroundGlobalOptions {
    /** Playground presets */
    presets: ("ts" | "vue" | PlaygroundOptions)[];
    /** Playground config */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
    };
  }
  ```

- Required: No

Playground options.

## vuePlayground

- Type: `VuePlaygroundOptions | boolean`

  ```ts
  interface VuePlaygroundOptions {
    /**
     * specify the version of vue
     */
    vueVersion?: string;

    /**
     * specify default URL to import Vue runtime from in the sandbox
     *
     * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
     */
    defaultVueRuntimeURL?: string;

    /**
     * Specify default URL to import Vue Server Renderer from in the sandbox
     *
     * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
     */
    defaultVueServerRendererURL?: string;

    /**
     * Whether to enable repl's editor resizable
     *
     * @default true
     */
    autoResize?: boolean;

    /**
     * Whether to show JS, CSS, SSR panel
     *
     * @default false
     */
    showCompileOutput?: boolean;

    /**
     * Whether to show import map
     *
     * @default true
     */
    showImportMap?: boolean;

    /**
     * Whether to clear console
     *
     * @default false
     */
    clearConsole?: boolean;

    /**
     * Layout
     *
     * @default 'horizontal'
     */
    layout?: "vertical" |layout?: "horizontal" | "vertical";

    /**
     * Options to configure the `vue/compiler-sfc`
     */
    sfcOptions?: SFCOptions;

    /**
     * Whether to enable SSR
     *
     * @default true
     */
    ssr?: boolean;
  }
  ```

- Default: `false`

Whether to enable vue playground support.

## demo

- Type: `CodeDemoGlobalOptions | boolean`
- Default: `false`

Whether to enable code demo support.

### demo.jsLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle requires an external JS library for dating.

### demo.cssLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle need an external CSS library for dating.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head`.

:::

### demo.jsfiddle

- Type: `boolean`
- Default value: `true`

Whether to display the JSFiddle button

### demo.codepen

- Type: `boolean`
- Default value: `true`

Whether to display the CodePen button

### demo.codepenLayout

- Type: `"top" | "left" | "correct"`
- Default value: `"left"`

CodePen editor layout

### demo.codepenEditors

- Type: `string`
- Default value: `"101"`

CodePen editor status

### others

The following are the library links used by the third-party code demo service. Unless your environment cannot visit unpkg or the speed is slow, you probably don’t need to override the default values.

#### demo.babel

Default value: `"https://unpkg.com/@babel/standalone/babel.min.js"`

#### demo.vue

Default value: `"https://unpkg.com/vue/dist/vue.global.prod.js"`

#### demo.react

Default value: `"https://unpkg.com/react/umd/react.production.min.js"`

#### demo.reactDOM

Default value: `"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

## presentation

- Type: `PresentationOptions | boolean`
- Default: `false`

Whether to enable presentation syntax support.

You can set it with an object, the object will be used to config reveal.js.

### presentation.plugins

- Type: `RevealPlugin[]`

  ```ts
  type RevealPlugin = "highlight" | "math" | "search" | "notes" | "zoom";
  ```

- Required: No

Plugins you want to use on reveal.js.

Acceptable values are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

### presentation.revealConfig

- Type: `Partial<RevealOptions>`
- Required: No

Config which you want to pass to reveal.js.

## delay

- Type: `number`
- Default: `800`

The delay of operating dom, in ms.

::: tip

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

:::

## locales

- Type: `MarkdownEnhanceLocaleConfig`

  ```ts
  interface MarkdownEnhanceLocaleData {
    /**
     * Default Title text for info block
     */
    info: string;

    /**
     * Default Title text for note block
     */
    note: string;

    /**
     * Default Title text for tip block
     */
    tip: string;

    /**
     * Default Title text for warning block
     */
    warning: string;

    /**
     * Default Title text for danger block
     */
    danger: string;

    /**
     * Default Title text for details block
     */
    details: string;
  }

  interface MarkdownEnhanceLocaleConfig {
    [localePath: string]: MarkdownEnhanceLocaleData;
  }
  ```

- Required: No

Locales config for Markdown Enhance Plugin.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **German (Australia)** (de-AT)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese (Brazil)** (pt-BR)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)

:::
