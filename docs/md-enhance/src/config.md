---
title: Config
icon: gears
order: 2
---

## Options

You can pass these options to the plugin:

:::: fields
@`playground` type=`PlaygroundGlobalOptions`

Playground options.

See also: [Playground](./guide/code/playground.md).

@@`playground.presets` type=`(BuiltInPlaygroundPreset | PlaygroundOptions)[]` required

Playground presets. `BuiltInPlaygroundPreset` is one of `"ts"`, `"vue"` and `"unocss"`, which enables a built-in preset, while an object configures a custom playground.

@@@`playground.presets[*].name` type=string required

Playground container name.

@@@`playground.presets[*].component` type=string default=`"Playground"`

Playground component name.

@@@`playground.presets[*].propsGetter` type=`(data: PlaygroundData) => Record<string, string>` required

Props getter. Its `data` argument has the following types:

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
```

@@`playground.config` type=`{ ts?: TSPresetPlaygroundOptions; vue?: VuePresetPlaygroundOptions; unocss?: UnoPresetPlaygroundOptions }`

Playground config of the built-in presets.

@@@`playground.config.ts` type=`TSPresetPlaygroundOptions`

Options of the `ts` preset.

@@@@`playground.config.ts.service` type=string default=`"https://www.typescriptlang.org/play"`

External playground service url.

@@@`playground.config.vue` type=`VuePresetPlaygroundOptions`

Options of the `vue` preset.

@@@@`playground.config.vue.service` type=string default=`"https://sfc.vuejs.org/"`

External playground service url.

@@@@`playground.config.vue.dev` type=boolean

Whether to use the development version.

@@@@`playground.config.vue.ssr` type=boolean

Whether to enable SSR.

@@@`playground.config.unocss` type=`UnoPresetPlaygroundOptions`

Options of the `unocss` preset.

@@@@`playground.config.unocss.service` type=string default=`"https://unocss.dev/play"`

External playground service url.

@`kotlinPlayground` type=boolean

Whether to enable kotlin playground support.

See also: [Kotlin Playground](./guide/code/kotlin-playground.md).

@`vuePlayground` type=boolean

Whether to enable vue playground support.

See also: [Vue Playground](./guide/code/vue-playground.md).

@`demo` type=`Partial<CodeDemoOptions> | boolean`

Whether to enable code demo support.

See also: [Code Demo](./guide/code/demo/README.md).

@@`demo.jsLib` type=`string[]`

External JS libraries for CodePen, JsFiddle only.

@@`demo.cssLib` type=`string[]`

External CSS libraries for CodePen, JsFiddle only.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head` to get it work.

:::

@@`demo.jsfiddle` type=boolean default=`true`

Whether to display the JSFiddle button.

@@`demo.codepen` type=boolean default=`true`

Whether to display the CodePen button.

@@`demo.codepenLayout` type=`"top" | "left" | "right"` default=`"left"`

CodePen editor layout.

@@`demo.codepenEditors` type=string default=`"101"`

CodePen editor status.

The following are the library links used by the third-party code demo service. Unless your environment cannot visit unpkg or the speed is slow, you probably don't need to override the default values.

@@`demo.babel` type=string default=`"https://unpkg.com/@babel/standalone/babel.min.js"`

@@`demo.vue` type=string default=`"https://unpkg.com/vue/dist/vue.global.prod.js"`

@@`demo.react` type=string default=`"https://unpkg.com/react/umd/react.production.min.js"`

@@`demo.reactDOM` type=string default=`"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

@`sandpack` type=boolean

Whether to enable sandpack playground support.

::::

## Client Config

### defineKotlinPlaygroundConfig

```ts
interface KotlinPlaygroundOptions {
  server?: string;
  version?: string;

  onChange?: (code: string) => void;
  onRun?: () => void;
  onError?: () => void;
  getJsCode?: (code: string) => void;
  onTestPassed?: () => void;
  onTestFailed?: () => void;
  onOpenConsole?: () => void;
  onCloseConsole?: () => void;
  callback?: (targetNode: HTMLElement, mountNode: HTMLElement) => void;
  getInstance?: (instance: KotlinPlaygroundInstance) => void;
}

const defineKotlinPlaygroundConfig: (options: KotlinPlaygroundOptions) => void;
```

Define config which you want to pass to `kotlin-playground`.

### defineSandpackConfig

```ts
 interface SandpackConfig {
  /**
   * specify the template
   */
  template?: SandpackPredefinedTemplate;

  /**
   * Options to configure the sandpack
   */
  options?: SandpackOptions;

  /**
   * Options to configure the customSetup
   */
  customSetup?: SandpackSetup;
}

const defineSandpackConfig = (config: SandpackConfig)=> void
```

Define config which you want to pass to `sandpack-vue3`.

### defineVuePlaygroundConfig

```ts
export interface VuePlaygroundOptions extends Omit<
  ReplProps,
  "store" | "editor"
> {
  /**
   * Specify the version of vue
   */
  vueVersion?: string;

  /**
   * Specify default URL to import Vue dev runtime from in the sandbox
   *
   * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
   */
  vueRuntimeDevUrl?: string | (() => string);

  /**
   * Specify default URL to import Vue prod runtime from in the sandbox
   *
   * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.prod.js"
   */
  vueRuntimeProdUrl?: string | (() => string);

  /**
   * Specify default URL to import Vue Server Renderer from in the sandbox
   *
   * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
   */
  vueServerRendererUrl?: string | (() => string);
}

const defineVuePlaygroundConfig: (options: VuePlaygroundOptions) => void;
```

Define config which you want to pass to `@vue/repl`.
