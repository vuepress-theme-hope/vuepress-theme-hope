---
title: 配置
icon: gears
order: 2
---

## 插件配置

你可以设置以下插件选项来启用或禁用一些功能。

### gfm

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [GFM](./guide/others.md#gfm)

是否支持完整的 GFM 语法。

::: note

有关完整的 GFM 语法，请参阅 [GFM](https://github.github.com/gfm/)。

老实说，我们没有 100% 实现 GFM，我们只是补全了它的常见语法。

某些行为可能会有所不同，例如，为了允许 Vue 语法，我们并没有禁止 `<script>` 标签。 但在大多数情况下，行为应该是相同的。

:::

### hint

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [提示容器](./guide/stylize/hint.md)

是否启用提示容器支持:

- info
- note
- tip
- warning
- caution
- details

::: warning

最后四个会和默认主题冲突，且会覆盖默认主题的样式与行为。

:::

### checkLinks

- 类型: `LinksCheckOptions`

  ```ts
  type LinksCheckStatus = "always" | "dev" | "build" | "never";

  interface LinksCheckOptions {
    /**
     * 是否检查 Markdown 中的死链
     *
     * @default "dev"
     */
    status?: LinksCheckStatus;

    /**
     * 忽略的死链
     */
    ignore?: (string | RegExp)[] | ((link: string, isDev: boolean) => boolean);
  }
  ```

- 默认值: `{ status: "dev" }`
- 详情:
  - [链接检查](./guide/others.md#链接检查)

是否启用链接检查。

### vPre

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [v-pre](./guide/others.md#v-pre)

是否启用 v-pre 容器。

### breaks

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是

是否将段落中的 `\n` 转换为 `<br>`

### linkify

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是

是否将文字中的链接格式文字转换为链接

### alert

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [GFM 警告](./guide/stylize/alert.md)

是否启用 GFM 警告。

### tabs

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [选项卡](./guide/content/tabs.md)

是否启用选项卡。

### codetabs

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [代码组](./guide/code/code-tabs.md)

是否启用代码组。

### align

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [自定义对齐](./guide/stylize/align.md)

是否启用自定义对齐格式支持。

### attrs

- 类型: `AttrsOptions | boolean`

  ```ts
  interface AttrsOptions {
    /**
     * 左分隔符
     *
     * @default '{'
     */
    left?: string;

    /**
     * 右分隔符
     *
     * @default '}'
     */
    right?: string;

    /**
     * 允许的属性
     *
     * @description 设置空数组意味着允许所有属性
     *
     * @default []
     */
    allowed?: (string | RegExp)[];
  }
  ```

- 默认值: `false`
- 详情:
  - [定义属性](./guide/stylize/attrs.md)

是否启用自定义属性支持。

### sup

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [上角标](./guide/grammar/sup-sub.md)

是否启用上角标格式支持。

### sub

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [下角标](./guide/grammar/sup-sub.md)

是否启用下角标格式支持。

### footnote

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [脚注](./guide/content/footnote.md)

是否启用脚注格式支持。

### mark

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [标记](./guide/stylize/mark.md)

是否启用标记格式支持。

### figure

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Figure](./guide/grammar/image.md#图片-figure)

是否启用图片 Figure 支持。

### imgLazyload

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [图片懒加载](./guide/grammar/image.md#图片懒加载)

是否使用原生方式懒加载页面图片。

### imgMark

- 类型: `ImageMarkOptions | boolean`

  ```ts
  interface ImageMarkOptions {
    /** 日间模式的 ID */
    light?: string[];
    /** 夜间模式的 ID */
    dark?: string[];
  }
  ```

- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [图片标记](./guide/grammar/image.md#图片-id-标记)

是否启用图片标注支持

### imgSize

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [图片尺寸](./guide/grammar/image.md#图片尺寸)

是否启用图片尺寸支持。

### obsidianImgSize

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [图片尺寸](./guide/grammar/image.md#图片尺寸)

是否启用 obsidian 图片尺寸支持。

### tasklist

- 类型: `TaskListOptions | boolean`

  ```ts
  interface TaskListOptions {
    /**
     * 是否禁用 checkbox
     *
     * @default true
     */
    disabled?: boolean;

    /**
     * 是否使用 `<label>` 来包裹文字
     *
     * @default true
     */
    label?: boolean;
  }
  ```

- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [任务列表](./guide/grammar/tasklist.md)

是否启用任务列表格式支持。你可以传入一个对象作为任务列表的配置选项。

### include

- 类型: `IncludeOptions | boolean`

  ```ts
  interface IncludeOptions {
    /**
     * 处理 include 文件路径
     *
     * @default (path) => path
     */
    resolvePath?: (path: string, cwd: string) => string;

    /**
     * 是否深度导入包含的 Markdown 文件
     *
     * @default false
     */
    deep?: boolean;
  }
  ```

- 默认值: `false`
- 详情:
  - [文件导入](./guide/content/include.md)

是否启用 Markdown 导入支持。你可以传入一个函数进行路径解析。

### katex

- 类型: `KatexOptions & { copy?: boolean; mhchem?: boolean } | boolean`
- 默认值: `false`
- 详情:
  - [TeX](./guide/grammar/tex.md)

是否通过 KaTeX 启用 $\TeX$ 语法支持。你可以传入一个对象作为 KaTeX 的配置选项。

特别地，你可以通过 `katex.copy: true` 和 `katex.mhchem: true` 来启用 copy 和 mhchem 扩展。

可用的选项，详见 [Katex 文档](https://katex.org/docs/options.html)。

### mathjax

- 类型: `MathJaxOptions | boolean`
- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [TeX](./guide/grammar/tex.md)

是否通过 Math Jax 启用 $\TeX$ 语法支持。你可以传递一个对象来配置 Math Jax。

可用的选项，详见 [源代码](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/md-enhance/src/shared/mathjax.ts)。

### component

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [组件](./guide/content/component.md)

是否启用组件支持。

### chart

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Chart.js](./guide/chart/chartjs.md)

是否启用图表支持。

### echarts

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Echarts](./guide/chart/echarts.md)

是否启用 ECharts 图表支持。

### flowchart

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [流程图](./guide/chart/flowchart.md)

是否启用流程图支持。

### markmap

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markmap](./guide/chart/markmap.md)

是否启用 [Markmap](https://markmap.js.org/) 支持。

### mermaid

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [Mermaid](./guide/chart/mermaid.md)

是否启用 [Mermaid](https://mermaid.js.org/) 支持。

### stylize

- 类型: `StylizeOptions | false`

  ```ts
  interface StylizeResult {
    /**
     * 渲染的标签名称
     */
    tag: string;

    /**
     * 属性设置
     */
    attrs: Record<string, string>;

    /**
     * 标签内容
     */
    content: string;
  }

  interface StylizeItem {
    /**
     * 字符匹配
     */
    matcher: string | RegExp;

    /**
     * 内容替换
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

- 默认值: `false`
- 详情:
  - [样式化](./guide/stylize/stylize.md)

对行内语法进行样式化以创建代码片段

### playground

- 类型: `PlaygroundGlobalOptions`

  ```ts
  import type { CompilerOptions } from "typescript";

  interface PlaygroundCodeConfig {
    /**
     * 代码块扩展名
     *
     * @description 它基于文件名，而不是代码块语言
     */
    ext: string;

    /**
     * 代码块内容
     */
    content: string;
  }

  interface PlaygroundData {
    /**
     * 交互演示标题
     */
    title?: string;

    /**
     * Import map 文件名
     *
     * @default 'import-map.json'
     */
    importMap?: string;

    /**
     * 交互演示文件信息
     */
    files: Record<
      /**
       * 文件名
       */
      string,
      /**
       * 文件详情
       */
      PlaygroundCodeConfig
    >;

    /**
     * 交互演示设置
     *
     * @description 它是设置指令后的 json 内容的解析结果
     */
    settings: Record<string, unknown>;

    /**
     * 根据交互演示内容生成的 hash key
     */
    key: string;
  }

  interface PlaygroundOptions {
    /**
     * 交互演示容器名
     */
    name: string;

    /**
     * 交互演示组件名称
     *
     * @default 'Playground'
     */
    component?: string;

    /**
     * 属性获取器
     */
    propsGetter: (data: PlaygroundData) => Record<string, string>;
  }

  interface TSPresetPlaygroundOptions extends CompilerOptions {
    /**
     * 交互演示外部地址
     *
     * @default "https://www.typescriptlang.org/play"
     */
    service?: string;
  }

  interface UnoPresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * 交互演示外部地址
     *
     * @default "https://unocss.dev/play"
     */
    service?: string;
  }

  interface VuePresetPlaygroundOptions {
    /**
     * 交互演示外部地址
     *
     * @default "https://sfc.vuejs.org/"
     */
    service?: string;

    /**
     * 是否启用开发版本
     *
     * @default false
     */
    dev?: boolean;

    /**
     * 是否启用 SSR
     *
     * @default false
     */
    ssr?: boolean;
  }

  interface PlaygroundGlobalOptions {
    /** 交互演示预设 */
    presets: ("ts" | "vue" | PlaygroundOptions)[];
    /** 交互演示配置 */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
    };
  }
  ```

- 必填: 否
- 详情:
  - [交互演示](./guide/code/playground.md)

交互演示选项。

### kotlinPlayground

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Kotlin 交互演示](./guide/code/kotlin-playground.md)

是否启用 Kotlin 交互演示支持。

### vuePlayground

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Vue 交互演示](./guide/code/vue-playground.md)

是否启用 Vue 交互演示支持。

### demo

- 类型: `CodeDemoGlobalOptions | boolean`
- 默认值: `false`
- 详情:
  - [代码案例](./guide/code/demo/README.md)

是否启用代码案例支持。

#### demo.jsLib

- 类型: `string[]`
- 必填: 否

CodePen, JsFiddle 需要引入的外部 JS 库。

#### demo.cssLib

- 类型: `string[]`
- 必填: 否

CodePen, JsFiddle 需要引入的外部 CSS 库。

::: warning

上述两个选项仅仅是给第三方代码演示使用的，你需要自行在 `head` 中导入这些库。

:::

#### demo.jsfiddle

- 类型: `boolean`
- 默认值: `true`

是否显示 JSFiddle 按钮

#### demo.codepen

- 类型: `boolean`
- 默认值: `true`

是否显示 CodePen 按钮

#### demo.codepenLayout

- 类型: `"top" | "left" | "right"`
- 默认值: `"left"`

CodePen 编辑器布局

#### demo.codepenEditors

- 类型: `string`
- 默认值: `"101"`

CodePen 编辑器状态

#### demo.editors

- 类型: `string`
- 默认值: `"101"`

CodePen 编辑器显示情况，第一位代表 HTML ，第二位代表 JS，第三位代表演示页面。

#### 其他

以下是第三方代码演示使用的库地址，除非你的环境无法访问 unpkg 或访问缓慢，否则无需覆盖默认设置。

##### demo.babel

默认值: `"https://unpkg.com/@babel/standalone/babel.min.js"`

##### demo.vue

默认值: `"https://unpkg.com/vue/dist/vue.global.prod.js"`

##### demo.react

默认值: `"https://unpkg.com/react/umd/react.production.min.js"`

##### demo.reactDOM

默认值: `"https://unpkg.com/react-dom/umd/react-dom.production.min.js"`

### revealJs

- 类型: `RevealJsOptions | boolean`

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
   * reveal.js 选项
   */
  export interface RevealJsOptions {
    /**
     * reveal.js 插件
     *
     * @default []
     */
    plugins?: RevealJsPlugin[];

    /**
     * reveal.js 主题
     *
     * @default ["auto"]
     */
    themes?: RevealJsTheme[];
  }
  ```

- 默认值: `false`
- 详情:
  - [Reveal.js](./guide/content/revealjs/README.md)

是否启用幻灯片支持。你可以传递选项控制导入的插件和主题。

### delay

- 类型: `number`
- 默认值: `800`

操作页面 DOM 的延时，单位 ms。

::: tip

如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`。

:::

### locales

- 类型: `MarkdownEnhanceLocaleConfig`

  ```ts
  interface MarkdownEnhanceLocaleData {
    /**
     * 信息块的默认标题
     */
    info: string;

    /**
     * 注释块的默认标题
     */
    note: string;

    /**
     * 提示块的默认标题
     */
    tip: string;

    /**
     * 注意块的默认标题
     */
    warning: string;

    /**
     * 警告块的默认标题
     */
    danger: string;

    /**
     * 详情块的默认标题
     */
    details: string;
  }

  interface MarkdownEnhanceLocaleConfig {
    [localePath: string]: MarkdownEnhanceLocaleData;
  }
  ```

- 必填: 否

Markdown 增强插件的国际化配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **德语(澳大利亚)** (de-AT)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

## 客户端配置

### defineEchartsConfig

```ts
export interface EchartsConfig {
  /**
   * Echarts 全局选项
   */
  option?: EChartsOption;

  /**
   * Echarts 初始化函数
   */
  setup?: () => Promise<void>;
}

export const defineEchartsConfig: (config: EchartsConfig) => void;
```

定义需要传递给 Echarts 的全局配置选项和设置函数。

### defineMermaidConfig

```ts
export const defineMermaidConfig: (options: MermaidConfig) => void;
```

定义需要传递给 Mermaid 的配置选项。

### defineRevealJsConfig

```ts
export const defineRevealJsConfig: (options: RevealOptions) => void;
```

定义需要传递给 Reveal.js 的配置选项。

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

export const defineKotlinPlaygroundConfig: (
  options: KotlinPlaygroundOptions,
) => void;
```

定义需要传递给 `kotlin-playground` 的配置选项。

### defineVuePlaygroundConfig

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
  layout?: "horizontal" | "vertical";

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

export const defineVuePlaygroundConfig: (options: VuePlaygroundOptions) => void;
```

定义需要传递给 `@vue/repl` 的选项。
