---
title: Markdown Code Config
icon: fa7-brands:markdown
order: 5
category:
  - Config
tag:
  - Markdown Config
  - Theme Config
---

The following options adds new code feature in Markdown, and can be set **under `markdown` property** in theme options.

## Options

:::: fields
@`markdown.codeTabs` type=boolean

Whether to enable tabs support.

See also: [Markdown → Code Tabs](../../guide/markdown/code/code-tabs.md) and [@vuepress/plugin-markdown-tab → codeTabs][codeTabs].

@`markdown.fileTree` type=boolean

Whether to enable file tree support.

See also: [Markdown → File Tree](../../guide/markdown/code/file-tree.md) and [@vuepress/plugin-markdown-file-tree → fileTree][fileTree].

@`markdown.codeTree` type=`boolean | MarkdownCodeTreePluginOptions`

Whether to enable code tree support. You can also pass an object to customize the default height.

See also: [Markdown → Code Tree](../../guide/markdown/code/code-tree.md) and [@vuepress/plugin-markdown-file-tree → codeTree][codeTree].

@@`markdown.codeTree.height` type=`number | string` default=`"320px"`

The default height of the code tree, accepts a CSS length or a number in pixels.

@`markdown.preview` type=boolean

Whether to enable preview support.

See also: [Markdown → Preview](../../guide/markdown/code/preview.md) and [@vuepress/plugin-markdown-preview][preview].

@`markdown.playground` type=`PlaygroundGlobalOptions`

Playground options.

See also: [Markdown → Playground](../../guide/markdown/code/playground.md).

@@`markdown.playground.presets` type=`(BuiltInPlaygroundPreset | PlaygroundOptions)[]` required

Playground presets. `BuiltInPlaygroundPreset` is one of `"ts"`, `"vue"` and `"unocss"`, which enables a built-in preset, while an object configures a custom playground.

@@@`markdown.playground.presets[*].name` type=string required

Playground container name.

@@@`markdown.playground.presets[*].component` type=string default=`"Playground"`

Playground component name.

@@@`markdown.playground.presets[*].propsGetter` type=`(data: PlaygroundData) => Record<string, string>` required

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

@@`markdown.playground.config` type=`{ ts?: TSPresetPlaygroundOptions; vue?: VuePresetPlaygroundOptions; unocss?: UnoPresetPlaygroundOptions }`

Playground config of the built-in presets.

@@@`markdown.playground.config.ts` type=`TSPresetPlaygroundOptions`

Options of the `ts` preset.

@@@@`markdown.playground.config.ts.service` type=string default=`"https://www.typescriptlang.org/play"`

External playground service url.

@@@`markdown.playground.config.vue` type=`VuePresetPlaygroundOptions`

Options of the `vue` preset.

@@@@`markdown.playground.config.vue.service` type=string default=`"https://sfc.vuejs.org/"`

External playground service url.

@@@@`markdown.playground.config.vue.dev` type=boolean

Whether to use the development version.

@@@@`markdown.playground.config.vue.ssr` type=boolean

Whether to enable SSR.

@@@`markdown.playground.config.unocss` type=`UnoPresetPlaygroundOptions`

Options of the `unocss` preset.

@@@@`markdown.playground.config.unocss.service` type=string default=`"https://unocss.dev/play"`

External playground service url.

@`markdown.kotlinPlayground` type=boolean

Whether to enable Kotlin playground support.

See also: [Markdown → Kotlin Playground](../../guide/markdown/code/kotlin-playground.md).

@`markdown.vuePlayground` type=boolean

Whether to enable Vue playground support.

See also: [Markdown → Vue Playground](../../guide/markdown/code/vue-playground.md).

@`markdown.sandpack` type=boolean

Whether to enable sandpack playground support.

See also: [Markdown → Sandpack Playground](../../guide/markdown/code/sandpack.md).

@`markdown.demo` type=`Partial<CodeDemoOptions> | boolean`

Whether to enable code demo support.

See also: [Markdown → Code Demo](../../guide/markdown/code/demo.md).

@@`markdown.demo.jsLib` type=`string[]`

External JS libraries for CodePen, JsFiddle only.

@@`markdown.demo.cssLib` type=`string[]`

External CSS libraries for CodePen, JsFiddle only.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head` to get it work.

:::

@@`markdown.demo.jsfiddle` type=boolean default=`true`

Whether to display the JSFiddle button.

@@`markdown.demo.codepen` type=boolean default=`true`

Whether to display the CodePen button.

@@`markdown.demo.codepenLayout` type=`"top" | "left" | "right"` default=`"left"`

CodePen editor layout.

@@`markdown.demo.codepenEditors` type=string default=`"101"`

CodePen editor status.

::::

[fileTree]: https://ecosystem.vuejs.press/plugins/markdown/markdown-file-tree.html#filetree
[codeTree]: https://ecosystem.vuejs.press/plugins/markdown/markdown-file-tree.html#codetree
[codeTabs]: https://ecosystem.vuejs.press/plugins/markdown/markdown-tab.html#codeTabs
[preview]: https://ecosystem.vuejs.press/plugins/markdown/markdown-preview.html
