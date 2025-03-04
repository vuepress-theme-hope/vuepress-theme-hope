---
title: Config
icon: gears
order: 2
---

## Plugin Options

You can pass these options to the plugin:

### chartjs

- Type: `boolean`
- Default: `false`
- Details:
  - [Chart.js](./guide/chart/chartjs.md)

Whether to enable chart support

### echarts

- Type: `boolean`
- Default: `false`
- Details:
  - [ECharts](./guide/chart/echarts.md)

Whether to enable ECharts support

### flowchart

- Type: `boolean`
- Default: `false`
- Details:
  - [Flowchart](./guide/chart/flowchart.md)

Whether to enable flowchart support

### markmap

- Type: `boolean`
- Default: `false`
- Details:
  - [Markmap](./guide/chart/markmap.md)

Whether to enable [Markmap](https://markmap.js.org/) support.

### mermaid

- Type: `boolean`
- Default: `false`
- Enabled in GFM: Yes
- Details:
  - [Mermaid](./guide/chart/mermaid.md)

Whether to enable [Mermaid](https://mermaid.js.org/) support.

### plantuml

- Type: `MarkdownItPlantumlOptions[] | boolean`
- Default: `false`
- Details:
  - [Plantuml](./guide/chart/plantuml.md)

Whether to enable [plantuml](https://plantuml.com/) support.

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
- Details:
  - [Playground](./guide/code/playground.md)

Playground options.

### kotlinPlayground

- Type: `boolean`
- Default: `false`
- Details:
  - [Kotlin Playground](./guide/code/kotlin-playground.md)

Whether to enable kotlin playground support.

### vuePlayground

- Type: `boolean`
- Default: `false`
- Details:
  - [Vue Playground](./guide/code/vue-playground.md)

Whether to enable vue playground support.

### demo

- Type: `CodeDemoGlobalOptions | boolean`
- Default: `false`
- Details:
  - [Code Demo](./guide/code/demo/README.md)

Whether to enable code demo support.

#### demo.jsLib

- Type: `string[]`
- Required: No

External JS libraries for CodePen, JsFiddle only.

#### demo.cssLib

- Type: `string[]`
- Required: No

External JS libraries for CodePen, JsFiddle only.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head` to get it work.

:::

#### demo.jsfiddle

- Type: `boolean`
- Default: `true`

Whether to display the JSFiddle button

#### demo.codepen

- Type: `boolean`
- Default: `true`

Whether to display the CodePen button

#### demo.codepenLayout

- Type: `"top" | "left" | "correct"`
- Default: `"left"`

CodePen editor layout

#### demo.codepenEditors

- Type: `string`
- Default: `"101"`

CodePen editor status

#### others

The following are the library links used by the third-party code demo service. Unless your environment cannot visit unpkg or the speed is slow, you probably don't need to override the default values.

##### demo.babel

Default value: `"https://unpkg.com/@babel/standalone/babel.min.js"`

##### demo.vue

Default value: `"https://unpkg.com/vue/dist/vue.global.prod.js"`

##### demo.react

Default value: `"https://unpkg.com/react/umd/react.production.min.js"`

##### demo.reactDOM

Default value: `"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

### sandpack

- Type: `boolean`
- Default: `false`

Whether to enable sandpack playground support.

## Client Config

### defineEChartsConfig

```ts
interface EChartsConfig {
  /**
   * ECharts global options
   */
  option?: EChartsOption;

  /**
   * ECharts setup function
   */
  setup?: () => Promise<void>;
}

const defineEChartsConfig: (config: EChartsConfig) => void;
```

Define global options and setup for ECharts.

### defineMermaidConfig

```ts
export type MermaidOptions = Omit<
  MermaidConfig,
  "startOnLoad" | "themeVariables"
> & {
  themeVariables?:
    | MermaidThemeVariables
    | ((isDarkMode: boolean) => MermaidThemeVariables);
};

const defineMermaidConfig: (options: MermaidOptions) => void;
```

Define config which you want to pass to mermaid. Additionally, you can use `themeVariables` to define colors of mermaid.

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
export interface VuePlaygroundOptions
  extends Omit<ReplProps, "store" | "editor"> {
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
