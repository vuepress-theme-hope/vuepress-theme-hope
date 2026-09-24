---
title: Markdown 代码配置
icon: b:markdown
order: 5
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项在 Markdown 中添加了新的代码功能，可以在主题选项的 `markdown` 属性下进行设置。

## markdown.codeTabs

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 代码选项卡](../../guide/markdown/code/code-tabs.md)
  - [@vuepress/plugin-markdown-tab → codeTabs][codeTabs]

是否启用选项卡支持。

## markdown.fileTree

- 类型：`boolean`
- 详情：
  - [Markdown → 文件树](../../guide/markdown/code/file-tree.md)
  - [@vuepress/plugin-markdown-file-tree → fileTree][fileTree]

是否启用文件树支持。

## markdown.codeTree

- 类型：`boolean | MarkdownCodeTreePluginOptions`

  ```ts
  interface MarkdownCodeTreePluginOptions {
    /**
     * 代码树的默认高度
     *
     * 接受 CSS 长度或像素数值。
     *
     * @default "320px"
     */
    height?: number | string;
  }
  ```

- 详情：
  - [Markdown → 代码树](../../guide/markdown/code/code-tree.md)
  - [@vuepress/plugin-markdown-file-tree → codeTree][codeTree]

是否启用代码树支持。你也可以传入对象以自定义默认高度。

## markdown.preview

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 预览](../../guide/markdown/code/preview.md)
  - [@vuepress/plugin-markdown-preview][preview]

是否启用预览支持。

## markdown.playground

- 类型: `PlaygroundGlobalOptions`

  ```ts twoslash
  import type { CompilerOptions } from "typescript";

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

  interface PlaygroundOptions {
    /** 交互演示容器名 */
    name: string;

    /**
     * 交互演示组件名称
     *
     * @default "Playground"
     */
    component?: string;

    /** 属性获取器 */
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

  interface UnoPresetPlaygroundOptions {
    /**
     * 交互演示外部地址
     *
     * @default "https://unocss.dev/play"
     */
    service?: string;
  }

  type BuiltInPlaygroundPreset = "ts" | "vue" | "unocss";

  interface PlaygroundGlobalOptions {
    /** 交互演示预设 */
    presets: (BuiltInPlaygroundPreset | PlaygroundOptions)[];
    /** 交互演示配置 */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
      unocss?: UnoPresetPlaygroundOptions;
    };
  }
  ```

- 必填: 否
- 详情:
  - [Markdown → 交互演示](../../guide/markdown/code/playground.md)

交互演示选项。

## markdown.kotlinPlayground

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → Kotlin 交互演示](../../guide/markdown/code/kotlin-playground.md)

是否启用 Kotlin 交互演示支持。

## markdown.vuePlayground

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → Vue 交互演示](../../guide/markdown/code/vue-playground.md)

是否启用 Vue 交互演示支持。

## markdown.sandpack

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → Sandpack 交互演示](../../guide/markdown/code/sandpack.md)

是否启用 Sandpack 交互演示支持。

## markdown.demo

- 类型: `CodeDemoGlobalOptions | boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 代码演示](../../guide/markdown/code/demo.md)

是否启用代码演示支持。

### markdown.demo.jsLib

- 类型: `string[]`
- 必填: 否

CodePen, JsFiddle 需要引入的外部 JS 库。

### markdown.demo.cssLib

- 类型: `string[]`
- Required: No

CodePen, JsFiddle 需要引入的外部 CSS 库。

::: warning

上述两个选项仅仅是给第三方代码演示使用的，你需要自行在 `head` 中导入这些库。

:::

### markdown.demo.jsfiddle

- 类型: `boolean`
- 默认值: `true`

是否显示 JSFiddle 按钮

### markdown.demo.codepen

- 类型: `boolean`
- 默认值: `true`

是否显示 CodePen 按钮

### markdown.demo.codepenLayout

- 类型: `"top" | "left" | "right"`
- 默认值: `"left"`

CodePen 编辑器布局

### markdown.demo.codepenEditors

- 类型: `string`
- 默认值: `"101"`

CodePen 编辑器状态

[fileTree]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-file-tree.html#filetree
[codeTree]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-file-tree.html#codetree
[codeTabs]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-tab.html#codeTabs
[preview]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-preview.html
