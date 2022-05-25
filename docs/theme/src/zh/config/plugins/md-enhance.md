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

### enableAll

- 类型: `boolean`
- 默认值: `false`

启用全部功能。

::: danger

请仅将此选项用于体验或测试。

随着时间的增长，`vuepress-plugin-md-enhance` 变得越来越强大。它为 Markdown 解析器添加了更多语法，并输出了更多代码。

启用不需要的功能将增加开发和构建时间。 (`markdown-it` 必须检查额外的语法)

同样，幻灯片演示功能将在输出中添加 700KB 大小的代码 (主要是 `reveal.js`)。

因此，请使用下面的选项，仅启用需要的功能。

:::

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

### vpre

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

### lazyLoad

- 类型: `boolean`
- 默认值: `false`

是否使用原生方式懒加载页面图片。

### mark

- 类型: `boolean`
- 默认值: `false`

是否启用标记格式支持。

### imageMark

- 类型: `ImageMarkOptions | boolean`
- 默认值: `false`

是否启用图片标注支持

```ts
interface ImageMarkOptions {
  /** lightmode only IDs */
  light?: string[];
  /** darkmode only IDs */
  dark?: string[];
}
```

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

### tex

- 类型: `KatexOptions | boolean`
- 默认值: `false`

是否启用 $\TeX$ 语法支持。你可以传入一个对象作为 $\KaTeX$ 的配置选项。

可用的选项，详见 [Katex 文档](https://katex.org/docs/options.html)。

### flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用流程图支持。

### mermaid

- 类型: `boolean`
- 默认值: `false`

是否启用 [Mermaid](https://mermaid-js.github.io/mermaid/#/) 支持。

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

- 类型: `string[]`
- 必填: No

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
- 必填: No

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

### stylize

- 类型: `StylizeOption`

```ts
type StylizeOption = Record<
  /**
   * 增强的关键词，`token.content` 暂不提供正则功能。
   * 默认全局增强，看通过 frontmatter 的noStylize单篇禁用关键词。
   */
  string,
  {
    /**
     * 所在标签，token.tag，如['strong','sup']。
     */
    tag: string[];

    /**
     * 标签属性，[attr, value]的数组（二维），如 `[['class':'badge tip']]`。
     * class 和 style 属性会 join ，其他属性则覆盖。
     */
    attr?: [string, string][];

    /**
     * `truthy`时，替换原 token.content
     */
    text?: string | ((str: string, env: MarkdownEnv) => string);
  }
>;
```

配置示例，对`**MUST**`和`^MUST^`增加样式，对`**NOT**`追加🚫

```ts
{
  MUST: { tag: ['strong', 'sup'], attr: [['class', 'badge info']] },
  NOT: { tag: ['strong'], text: 'NOT🚫' },
}
```
