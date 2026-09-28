---
title: 配置
icon: gears
order: 2
---

## 选项 {#options}

你可以设置以下插件选项来启用或禁用一些功能。

:::: fields
@`playground` type=`PlaygroundGlobalOptions`

交互演示选项。

参考：[交互演示](./guide/code/playground.md)。

@@`playground.presets` type=`(BuiltInPlaygroundPreset | PlaygroundOptions)[]` required

交互演示预设。`BuiltInPlaygroundPreset` 为 `"ts"`、`"vue"` 或 `"unocss"` 之一，会启用内置预设，而对象则用于配置自定义交互演示。

@@@`playground.presets[*].name` type=string required

交互演示容器名。

@@@`playground.presets[*].component` type=string default=`"Playground"`

交互演示组件名称。

@@@`playground.presets[*].propsGetter` type=`(data: PlaygroundData) => Record<string, string>` required

属性获取器。其 `data` 参数类型如下：

```ts
interface PlaygroundCodeConfig {
  /**
   * 代码块扩展名
   *
   * @description 它基于文件名，而不是代码块语言
   */
  ext: string;

  /** 代码块内容 */
  content: string;
}

interface PlaygroundData {
  /** 交互演示标题 */
  title?: string;

  /**
   * Import map 文件名
   *
   * @default "import-map.json"
   */
  importMap?: string;

  /** 交互演示文件信息 */
  files: Record<
    /** 文件名 */
    string,
    /** 文件详情 */
    PlaygroundCodeConfig
  >;

  /**
   * 交互演示设置
   *
   * @description 它是设置指令后的 json 内容的解析结果
   */
  settings: Record<string, unknown>;

  /**
   * hash key based on playground content
   *
   * 根据交互演示内容生成的 hash key
   */
  key: string;
}
```

@@`playground.config` type=`{ ts?: TSPresetPlaygroundOptions; vue?: VuePresetPlaygroundOptions; unocss?: UnoPresetPlaygroundOptions }`

内置预设的交互演示配置。

@@@`playground.config.ts` type=`TSPresetPlaygroundOptions`

`ts` 预设的选项。

@@@@`playground.config.ts.service` type=string default=`"https://www.typescriptlang.org/play"`

交互演示外部地址。

@@@`playground.config.vue` type=`VuePresetPlaygroundOptions`

`vue` 预设的选项。

@@@@`playground.config.vue.service` type=string default=`"https://sfc.vuejs.org/"`

交互演示外部地址。

@@@@`playground.config.vue.dev` type=boolean

是否启用开发版本。

@@@@`playground.config.vue.ssr` type=boolean

是否启用 SSR。

@@@`playground.config.unocss` type=`UnoPresetPlaygroundOptions`

`unocss` 预设的选项。

@@@@`playground.config.unocss.service` type=string default=`"https://unocss.dev/play"`

交互演示外部地址。

@`kotlinPlayground` type=boolean

是否启用 Kotlin 交互演示支持。

参考：[Kotlin 交互演示](./guide/code/kotlin-playground.md)。

@`vuePlayground` type=boolean

是否启用 Vue 交互演示支持。

参考：[Vue 交互演示](./guide/code/vue-playground.md)。

@`demo` type=`Partial<CodeDemoOptions> | boolean`

是否启用代码案例支持。

参考：[代码案例](./guide/code/demo/README.md)。

@@`demo.jsLib` type=`string[]`

CodePen, JsFiddle 需要引入的外部 JS 库。

@@`demo.cssLib` type=`string[]`

CodePen, JsFiddle 需要引入的外部 CSS 库。

::: warning

上述两个选项仅仅是给第三方代码演示使用的，你需要自行在 `head` 中导入这些库。

:::

@@`demo.jsfiddle` type=boolean default=`true`

是否显示 JSFiddle 按钮。

@@`demo.codepen` type=boolean default=`true`

是否显示 CodePen 按钮。

@@`demo.codepenLayout` type=`"top" | "left" | "right"` default=`"left"`

CodePen 编辑器布局。

@@`demo.codepenEditors` type=string default=`"101"`

CodePen 编辑器状态。

以下是第三方代码演示使用的库地址，除非你的环境无法访问 unpkg 或访问缓慢，否则无需覆盖默认设置。

@@`demo.babel` type=string default=`"https://unpkg.com/@babel/standalone/babel.min.js"`

@@`demo.vue` type=string default=`"https://unpkg.com/vue/dist/vue.global.prod.js"`

@@`demo.react` type=string default=`"https://unpkg.com/react/umd/react.production.min.js"`

@@`demo.reactDOM` type=string default=`"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

@`sandpack` type=boolean

是否启用 Sandpack 交互演示。

::::

## 客户端配置 {#client-config}

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

定义需要传递给 `kotlin-playground` 的配置选项。

### defineSandpackConfig

```ts
 interface SandpackConfig {
  /**
   * 指定模板
   */
  template?: SandpackPredefinedTemplate;

  /**
   * sandpack 配置项
   */
  options?: SandpackOptions;

  /**
   * sandpack customSetup 配置项
   */
  customSetup?: SandpackSetup;
}

const defineSandpackConfig = (config: SandpackConfig)=> void
```

定义需要传递给 `sandpack-vue3` 的选项。

### defineVuePlaygroundConfig

```ts
export interface VuePlaygroundOptions extends Omit<
  ReplProps,
  "store" | "editor"
> {
  /**
   * 指定 vue 版本
   */
  vueVersion?: string;

  /**
   * 指定默认的 Vue 开发运行时
   *
   * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
   */
  vueRuntimeDevUrl?: string | (() => string);

  /**
   * 指定默认的 Vue 生产运行时
   *
   * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.prod.js"
   */
  vueRuntimeProdUrl?: string | (() => string);

  /**
   * 指定默认的 Vue 服务端渲染器
   *
   * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
   */
  vueServerRendererUrl?: string | (() => string);
}

const defineVuePlaygroundConfig: (options: VuePlaygroundOptions) => void;
```

定义需要传递给 `@vue/repl` 的选项。
