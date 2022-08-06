---
title: Config
icon: config
---

You can pass these options to the plugin:

## gfm

- Type: `boolean`
- Default: `false`

Whether to support full GFM syntax.

::: note

For full GFM syntax, see [GFM](https://github.github.com/gfm/).

We are not 100% supporting it to be honestly, we only supply it’s syntax inlucding tasklists, footnote and so on.

Some of the behavior might be different, for example to allow Vue syntax, we are not disallowing `<script>` tags. But in most situation, the behavior should be same.

:::

## container

- Type: `boolean`
- Default: `false`

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

## vpre

- Type: `boolean`
- Default: `false`

Whether to enable v-pre wrapper.

## tabs

- Type: `boolean`
- Default: `false`

Whether to enable tabs.

## codetabs

- Type: `boolean`
- Default: `false`

Whether to enable codetabs.

## align

- Type: `boolean`
- Default: `false`

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

Whether to enable attribute cutomize support.

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

## lazyLoad

- Type: `boolean`
- Default: `false`

Whether to lazy load every images in page in native way.

## mark

- Type: `boolean`
- Default: `false`

Whether to enable mark support.

## imageMark

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

## tex

- Type: `KatexOptions | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support. You can pass an object to config $\KaTeX$.

Please see [Katex Docs](https://katex.org/docs/options.html) for available options.

## include

- Type: `IncludeOptions | boolean`

  ```ts
  interface IncludeOptions {
    /**
     * handle include filePath
     *
     * @default (path) => path
     */
    getPath?: (path: string) => string;

    /**
     * Whether deep include files in included markdown files
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

- Type: `boolean`
- Default: `false`

Whether to enable [Mermaid](https://mermaid-js.github.io/mermaid/#/) support.

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

## playground

- Type: `PlaygroundOptions | boolean`
- Default: `false`

Whether to enable playground support.

```ts
/** Playground options */
interface PlaygroundOptions {
  /** mode: [internal, external] */
  mode?: PlaygroundMode;
  /**
   * external options
   */
  external?: ExternalPlaygroundOptions;
  /**
   * internal options
   */
  internal?: InternalPlaygroundOptions;
}

/**
 * Playground external options
 */
interface ExternalPlaygroundOptions {
  /**
   * playground base url
   */
  base?: string;
  /**
   * default import map, default value: "imports-map.json".
   * you can use your own, for example: "user-imports.json".
   */
  defaultImportsMap?: string;
  /**
   * other options, which will be passed as query strings.
   */
  options?: Record<string, string>;
}

/**
 * Playground internal options.
 * Please see `@vue/repl` for more details.
 */
interface InternalPlaygroundOptions {
  /**
   * specify the default URL to import Vue runtime from in the sandbox
   * default is the CDN link from unpkg.com.
   */
  defaultVueRuntimeURL?: string;
  /**
   * specify the version of vue
   */
  vueVersion?: string;
  /**
   * default import map, default value: "imports-map.json".
   * you can use your own, for example: "user-imports.json".
   */
  defaultImportsMap?: string;
  /**
   * Whether to enable repl's editor resizable.
   */
  autoResize?: boolean;
  /**
   * Whether to show code.
   */
  showCode?: boolean;
  /**
   * Whether to show js, css, ssr panel.
   */
  showCompileOutput?: boolean;
  /**
   * Whether to show import map.
   */
  showImportMap?: boolean;
  /**
   * Whether to clear console.
   */
  clearConsole?: boolean;
  /**
   * When layout is 'vertical', displays as top-down.
   * Otherwise, displays as left-right.
   * Default is 'vertical'.
   */
  layout?: string;
  /**
   * Options to configure the `vue/compiler-sfc`.
   */
  sfcOptions?: SFCOptions;
  /**
   * Whether to enable SSR.
   */
  ssr?: boolean;
}
```

## delay

- Type: `number`
- Default: `500`

The delay of operating dom, in ms.

::: tip

If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.

:::

## enableAll <Badge text="Demo only" type="danger" />

- Type: `boolean`
- Default: `false`

Whether to enable all features.

::: danger

Please use this option ONLY for playing or testing.

The plugin is FULLY treeshakable, so you should use the options below and enable ONLY the feature you want to use.

Enabling features you don’t need will increase dev and build time. (`markdown-it` has to check for extra syntaxs)

Also, some feature will add large chunks to your output (can up to 2MB).

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
