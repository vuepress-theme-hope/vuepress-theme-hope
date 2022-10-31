---
title: MdEnhance 插件配置
icon: markdown
order: 6
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - Markdown
---

## 介绍

`vuepress-plugin-md-enhance` 插件默认启用，提供 Markdown 增强功能。

`vuepress-theme-hope` 将主题选项中的 `plugins.mdEnhance` 作为插件选项传递给 `vuepress-plugin-md-enhance` 插件。

::: tip

如果你不需要这个功能，请设置为 `false`。

:::

::: info

`vuepress-theme-hope` 会默认将 `container` 选项设置为 `true`。

有关更多详细信息，请参见 [md-enhance 文档][md-enhance-config]。

:::

## 插件选项

### gfm

- 类型: `boolean`
- 默认值: `false`

是否支持完整的 GFM 语法。

::: note

有关完整的 GFM 语法，请参阅 [GFM](https://github.github.com/gfm/)。

老实说，我们并不是 100% 支持它，我们只补全了它的语法，包括任务列表、脚注等。

某些行为可能会有所不同，例如，为了允许 Vue 语法，我们并没有禁止 `<script>` 标签。 但在大多数情况下，行为应该是相同的。

:::

### container

- 类型: `boolean`
- 默认值: `true`

是否启用自定义容器支持:

- info
- note
- tip
- warning
- danger
- details

### linkCheck

- 类型: `"always" | "dev" | "build" | "never" | boolean`
- 默认值: `"dev"`

是否启用链接检查。

::: note

- `true` 等同于 `'always'`
- `false` 等同于 `'never'`

:::

### vPre

- 类型: `boolean`
- 默认值: `false`

是否启用 v-pre 容器。

### tabs

- 类型: `boolean`
- 默认值: `false`

是否启用选项卡。

### codetabs

- 类型: `boolean`
- 默认值: `false`

是否启用代码组。

### align

- 类型: `boolean`
- 默认值: `false`

是否启用自定义对齐格式支持。

### sup

- 类型: `boolean`
- 默认值: `false`

是否启用上角标格式支持。

### sub

- 类型: `boolean`
- 默认值: `false`

是否启用下角标格式支持。

### footnote

- 类型: `boolean`
- 默认值: `false`

是否启用脚注格式支持。

### mark

- 类型: `boolean`
- 默认值: `false`

是否启用标记格式支持。

### imageLazyload

- 类型: `boolean`
- 默认值: `false`

是否使用原生方式懒加载页面图片。

### imageMark

- 类型: `ImageMarkOptions | boolean`
- 默认值: `false`

是否启用图片标注支持

```ts
interface ImageMarkOptions {
  /** 日间模式的 ID */
  light?: string[];
  /** 夜间模式的 ID */
  dark?: string[];
}
```

### imageSize

- 类型: `boolean`
- 默认值: `false`

是否启用图片尺寸支持。

### imageTitle

- 类型: `boolean`
- 默认值: `false`

是否启用图片标题支持。

### tasklist

- 类型: `TaskListOptions | boolean`
- 默认值: `false`

是否启用任务列表格式支持。你可以传入一个对象作为任务列表的配置选项。

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

### katex

- 类型: `KatexOptions | boolean`
- 默认值: `false`

是否通过 $\KaTeX$ 启用 $\TeX$ 语法支持。你可以传入一个对象作为 $\KaTeX$ 的配置选项。

特别低，你可以通过 `katex.mhchem: true` 来启用 mhchem 扩展。

可用的选项，详见 [Katex 文档](https://katex.org/docs/options.html)。

### mathjax

- 类型: `MathJaxOptions | boolean`
- 默认值: `false`

是否通过 Math Jax 启用 $\TeX$ 语法支持。你可以传递一个对象来配置 Math Jax。

可用的选项，详见 [源代码](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/md-enhance/src/shared/mathjax.ts)。

### flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用流程图支持。

### mermaid

- 类型: `boolean`
- 默认值: `false`

是否启用 [Mermaid](https://mermaid-js.github.io/mermaid/#/) 支持。

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

  export interface VuePresetPlaygroundOptions {
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

交互演示选项。

### vuePlayground

- 类型: `VuePlaygroundOptions | boolean`

  ```ts
  interface VuePlaygroundOptions {
    /**
     * 是否在交互演示中显示代码
     *
     * @default false
     */
    showCode?: boolean;

    /**
     * 指定 vue 版本
     */
    vueVersion?: string;

    /**
     * 指定默认的 Vue 运行时
     *
     * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
     */
    defaultVueRuntimeURL?: string;

    /**
     * 指定默认的 Vue 服务端渲染器
     *
     * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
     */
    defaultVueServerRendererURL?: string;

    /**
     * 是否启用自动调整大小
     *
     * @default true
     */
    autoResize?: boolean;

    /**
     * 是否显示 JS, CSS, SSR 面板
     *
     * @default false
     */
    showCompileOutput?: boolean;

    /**
     * 是否显示 import map
     *
     * @default true
     */
    showImportMap?: boolean;

    /**
     * 是否清空控制台
     *
     * @default false
     */
    clearConsole?: boolean;

    /**
     * 布局
     *
     * @default 'vertical'
     */
    layout?: "vertical" | "horizontal";

    /**
     * `vue/compiler-sfc` 配置项
     */
    sfcOptions?: SFCOptions;

    /**
     * 是否启用 SSR
     *
     * @default true
     */
    ssr?: boolean;
  }
  ```

- 默认值: `false`

是否启用 Vue 交互演示支持。

### demo

- 类型: `CodeDemoGlobalOptions | boolean`
- 默认值: `false`

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

- Type: `string`
- Default value: `"101"`

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

### presentation

- 类型: `PresentationOptions | boolean`
- 默认值: `false`

是否启用幻灯片支持。

你可以传入一个对象，这个对象将用于 reveal.js 配置。

#### presentation.plugins

- 类型: `RevealPlugin[]`

  ```ts
  type RevealPlugin = "highlight" | "math" | "search" | "notes" | "zoom";
  ```

- 必填: 否

你想启用的 Reveal.js 插件

可接受的插件有:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

#### presentation.revealConfig

- 类型: `Partial<RevealOptions>`
- 必填: 否

你想要传递给 Reveal.js 的配置选项

### delay

- 类型: `number`
- 默认值: `500`

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

[md-enhance-config]: https://vuepress-theme-hope.github.io/v2/md-enhance/zh/config.html
