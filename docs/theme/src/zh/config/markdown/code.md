---
title: Markdown 代码配置
icon: fa7-brands:markdown
order: 5
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项在 Markdown 中添加了新的代码功能，可以在主题选项的 `markdown` 属性下进行设置。

## 选项 {#options}

:::: fields
@`markdown.codeTabs` type=boolean

是否启用选项卡支持。

参考：[Markdown → 代码选项卡](../../guide/markdown/code/code-tabs.md) 与 [@vuepress/plugin-markdown-tab → codeTabs][codeTabs]。

@`markdown.fileTree` type=boolean

是否启用文件树支持。

参考：[Markdown → 文件树](../../guide/markdown/code/file-tree.md) 与 [@vuepress/plugin-markdown-file-tree → fileTree][fileTree]。

@`markdown.codeTree` type=`boolean | MarkdownCodeTreePluginOptions`

是否启用代码树支持。你也可以传入对象以自定义默认高度。

参考：[Markdown → 代码树](../../guide/markdown/code/code-tree.md) 与 [@vuepress/plugin-markdown-file-tree → codeTree][codeTree]。

@@`markdown.codeTree.height` type=`number | string` default=`"320px"`

代码树的默认高度，接受 CSS 长度或像素数值。

@`markdown.preview` type=boolean

是否启用预览支持。

参考：[Markdown → 预览](../../guide/markdown/code/preview.md) 与 [@vuepress/plugin-markdown-preview][preview]。

@`markdown.playground` type=`PlaygroundGlobalOptions`

交互演示选项。

参考：[Markdown → 交互演示](../../guide/markdown/code/playground.md)。

@@`markdown.playground.presets` type=`(BuiltInPlaygroundPreset | PlaygroundOptions)[]` required

交互演示预设。`BuiltInPlaygroundPreset` 是 `"ts"`、`"vue"` 与 `"unocss"` 之一，用于启用内置预设，而对象则用于配置自定义交互演示。

@@@`markdown.playground.presets[*].name` type=string required

交互演示容器名。

@@@`markdown.playground.presets[*].component` type=string default=`"Playground"`

交互演示组件名称。

@@@`markdown.playground.presets[*].propsGetter` type=`(data: PlaygroundData) => Record<string, string>` required

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

@@`markdown.playground.config` type=`{ ts?: TSPresetPlaygroundOptions; vue?: VuePresetPlaygroundOptions; unocss?: UnoPresetPlaygroundOptions }`

内置预设的交互演示配置。

@@@`markdown.playground.config.ts` type=`TSPresetPlaygroundOptions`

`ts` 预设的选项。

@@@@`markdown.playground.config.ts.service` type=string default=`"https://www.typescriptlang.org/play"`

交互演示外部地址。

@@@`markdown.playground.config.vue` type=`VuePresetPlaygroundOptions`

`vue` 预设的选项。

@@@@`markdown.playground.config.vue.service` type=string default=`"https://sfc.vuejs.org/"`

交互演示外部地址。

@@@@`markdown.playground.config.vue.dev` type=boolean

是否启用开发版本。

@@@@`markdown.playground.config.vue.ssr` type=boolean

是否启用 SSR。

@@@`markdown.playground.config.unocss` type=`UnoPresetPlaygroundOptions`

`unocss` 预设的选项。

@@@@`markdown.playground.config.unocss.service` type=string default=`"https://unocss.dev/play"`

交互演示外部地址。

@`markdown.kotlinPlayground` type=boolean

是否启用 Kotlin 交互演示支持。

参考：[Markdown → Kotlin 交互演示](../../guide/markdown/code/kotlin-playground.md)。

@`markdown.vuePlayground` type=boolean

是否启用 Vue 交互演示支持。

参考：[Markdown → Vue 交互演示](../../guide/markdown/code/vue-playground.md)。

@`markdown.sandpack` type=boolean

是否启用 Sandpack 交互演示支持。

参考：[Markdown → Sandpack 交互演示](../../guide/markdown/code/sandpack.md)。

@`markdown.demo` type=`Partial<CodeDemoOptions> | boolean`

是否启用代码演示支持。

参考：[Markdown → 代码演示](../../guide/markdown/code/demo.md)。

@@`markdown.demo.jsLib` type=`string[]`

CodePen, JsFiddle 需要引入的外部 JS 库。

@@`markdown.demo.cssLib` type=`string[]`

CodePen, JsFiddle 需要引入的外部 CSS 库。

::: warning

上述两个选项仅仅是给第三方代码演示使用的，你需要自行在 `head` 中导入这些库。

:::

@@`markdown.demo.jsfiddle` type=boolean default=`true`

是否显示 JSFiddle 按钮。

@@`markdown.demo.codepen` type=boolean default=`true`

是否显示 CodePen 按钮。

@@`markdown.demo.codepenLayout` type=`"top" | "left" | "right"` default=`"left"`

CodePen 编辑器布局。

@@`markdown.demo.codepenEditors` type=string default=`"101"`

CodePen 编辑器状态。

::::

[fileTree]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-file-tree.html#filetree
[codeTree]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-file-tree.html#codetree
[codeTabs]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-tab.html#codeTabs
[preview]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-preview.html
