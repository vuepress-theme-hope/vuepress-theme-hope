---
title: MdEnhance Plugin Config
icon: markdown
order: 6
category:
  - Config
tag:
  - Markdown
  - Plugin Config
  - Theme Config
---

## Introduction

The `vuepress-plugin-md-enhance` plugin is enabled by default and provides Markdown enhancements.

`vuepress-theme-hope` passes `plugins.mdEnhance` in theme options as plugin options to `vuepress-plugin-md-enhance` plugin.

::: tip

If you don’t need this feature, please set to `false`.

:::

::: info

`vuepress-theme-hope` will set the `container` option to `true` by default.

See the [md-enhance documentation][md-enhance-config] for more details.

:::

## Plugin Options

### gfm

- Type: `boolean`
- Default: `false`

Whether to support full GFM syntax.

::: note

For full GFM syntax, see [GFM](https://github.github.com/gfm/).

We are not 100% supporting it to be honestly, we only supply it’s syntax including tasklists, footnote and so on.

Some of the behavior might be different, for example to allow Vue syntax, we are not disallowing `<script>` tags. But in most situation, the behavior should be same.

:::

### container

- Type: `boolean`
- Default: `true`

Whether to enable custom container including

- info
- note
- tip
- warning
- danger
- details

### linkCheck

- Type: `"always" | "dev" | "build" | "never" | boolean`
- Default: `"dev"`

Whether to enable link check.

::: note

- `true` equals to `'always'`
- `false` equals to `'never'`

:::

### vPre

- Type: `boolean`
- Default: `false`

Whether to enable v-pre wrapper.

### tabs

- Type: `boolean`
- Default: `false`

Whether to enable tabs.

### codetabs

- Type: `boolean`
- Default: `false`

Whether to enable codetabs.

### align

- Type: `boolean`
- Default: `false`

Whether to enable custom align.

### sup

- Type: `boolean`
- Default: `false`

Whether to enable the upper format support.

### sub

- Type: `boolean`
- Default: `false`

Whether to enable the lower corner format support.

### footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support.

### lazyLoad

- Type: `boolean`
- Default: `false`

Whether to lazy load every images in page in native way.

### mark

- Type: `boolean`
- Default: `false`

Whether to enable mark support.

### imageMark

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

### imageSize

- Type: `boolean`
- Default: `false`

Whether enable image size support.

### imageTitle

- Type: `boolean`
- Default: `false`

Whether enable image title support.

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

- Type: `KatexOptions & { mhchem?: boolean } | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support through $\KaTeX$. You can pass an object to config $\KaTeX$.

In particular, you can enable the mhchem extension with `katex.mhchem: true`.

Please see [Katex Docs](https://katex.org/docs/options.html) for available options.

### mathjax

- Type: `MathJaxOptions | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support through Math Jax. You can pass an object to config Math Jax.

Please see [source code](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/md-enhance/src/shared/mathjax.ts) for available options.

### flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart support

### mermaid

- Type: `boolean`
- Default: `false`

Whether to enable [Mermaid](https://mermaid-js.github.io/mermaid/#/) support.

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

  export interface VuePresetPlaygroundOptions {
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

### vuePlayground

- Type: `VuePlaygroundOptions | boolean`

  ```ts
  interface VuePlaygroundOptions {
    /**
     * Whether to show code in playground
     *
     * @default false
     */
    showCode?: boolean;

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
     * @default 'vertical'
     */
    layout?: "vertical" | "horizontal";

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

#### demo.jsfiddle

- Type: `boolean`
- Default value: `true`

Whether to display the JSFiddle button

#### demo.codepen

- Type: `boolean`
- Default value: `true`

Whether to display the CodePen button

#### demo.codepenLayout

- Type: `"top" | "left" | "correct"`
- Default value: `"left"`

CodePen editor layout

#### demo.codepenEditors

- Type: `string`
- Default value: `"101"`

CodePen editor status

#### others

The following are the library links used by the third-party code demo service. Unless your environment cannot visit unpkg or the speed is slow, you probably don’t need to override the default values.

##### demo.babel

Default value: `"https://unpkg.com/@babel/standalone/babel.min.js"`

##### demo.vue

Default value: `"https://unpkg.com/vue/dist/vue.global.prod.js"`

##### demo.react

Default value: `"https://unpkg.com/react/umd/react.production.min.js"`

##### demo.reactDOM

Default value: `"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

### presentation

- Type: `PresentationOptions | boolean`
- Default: `false`

Whether to enable presentation syntax support.

You can set it with an object, the object will be used to config reveal.js.

#### presentation.plugins

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

#### presentation.revealConfig

- Type: `Partial<RevealOptions>`
- Required: No

Config which you want to pass to reveal.js.

### delay

- Type: `number`
- Default: `500`

The delay of operating dom, in ms.

::: tip

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

:::

### locales

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

[md-enhance-config]: https://vuepress-theme-hope.github.io/v2/md-enhance/config.html
