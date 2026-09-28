---
title: Markdown 语法配置
icon: fa7-brands:markdown
order: 2
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项在 markdown 中添加了新的语法，可以在主题选项的 `markdown` 属性下进行设置。

## 选项 {#options}

::: fields
@`markdown.component` type=boolean

是否启用组件支持。

参考：[组件 → 语法](../../guide/component/grammar.md) 与 [@vuepress/plugin-markdown-ext → component][component]。

@`markdown.footnote` type=boolean gfm=Yes

是否启用脚注格式支持。

参考：[Markdown → 脚注](../../guide/markdown/content/footnote.md) 与 [@vuepress/plugin-markdown-ext → footnote][footnote]。

@`markdown.imgMark` type=boolean

是否启用图片标记。

参考：[Markdown → 图片标记](../../guide/markdown/grammar/image.md#图片-id-标记) 与 [@vuepress/plugin-markdown-image → mark][mark]。

@`markdown.imgSize` type=boolean

是否启用图片大小。

参考：[Markdown → 图片尺寸](../../guide/markdown/grammar/image.md#图片尺寸) 与 [@vuepress/plugin-markdown-image → size][size]。

@`markdown.obsidianImgSize` type=boolean

是否启用 Obsidian 图片大小。

参考：[Markdown → 图片尺寸](../../guide/markdown/grammar/image.md#图片尺寸) 与 [@vuepress/plugin-markdown-image → obsidianSize][obsidianSize]。

@`markdown.legacyImgSize` type=boolean deprecated

是否启用旧版图片大小。

参考：[Markdown → 图片尺寸](../../guide/markdown/grammar/image.md#图片尺寸) 与 [@vuepress/plugin-markdown-image → legacySize][legacySize]。

@`markdown.include` type=`MarkdownIncludePluginOptions | boolean`

是否启用 Markdown 导入支持。你可以传递一个选项来自定义行为。

参考：[Markdown → 导入文件](../../guide/markdown/content/include.md) 与 [@vuepress/plugin-markdown-include][include]。

@@`markdown.include.resolvePath` type=`(path: string, cwd: string) => string` default=`(path) => path`

处理包含的文件路径。

@@`markdown.include.deep` type=boolean

是否在包含的 Markdown 文件中深度包含文件。

@`markdown.fields` type=boolean

是否启用字段支持。

参考：[Markdown → 字段](../../guide/markdown/content/fields.md) 与 [@vuepress/plugin-markdown-field → fields][fields]。

@`markdown.tabs` type=boolean

是否启用选项卡支持。

参考：[Markdown → 选项卡](../../guide/markdown/content/tabs.md) 与 [@vuepress/plugin-markdown-tab → tabs][tabs]。

@`markdown.tasklist` type=`MarkdownItTaskListOptions | boolean` gfm=Yes

是否启用任务列表格式支持。你可以传递一个对象来配置任务列表。

参考：[Markdown → 任务列表](../../guide/markdown/grammar/tasklist.md) 与 [@vuepress/plugin-markdown-ext → tasklist][tasklist]。

@@`markdown.tasklist.disabled` type=boolean default=`true`

是否禁用复选框。

@@`markdown.tasklist.label` type=boolean default=`true`

是否使用 `<label>` 包装文本。

@`markdown.math` type=`MarkdownMathPluginOptions | boolean`

是否启用数学公式支持。你可以设置 `true` 来自动检测已安装的 katex/mathjax，或提供插件选项。

参考：[Markdown → 数学公式](../../guide/markdown/grammar/math.md) 与 [@vuepress/plugin-markdown-math][math]。

其类型为：

```ts
interface MarkdownKatexPluginOptions extends KatexOptions {
  type?: "katex";

  /**
   * 是否允许两端带空格的内联数学
   *
   * @description 不建议将此设置为 true，因为它很可能会破坏 $ 的默认使用
   *
   * @default false
   */
  allowInlineWithSpace?: boolean;

  /**
   * 是否启用复制插件
   *
   * @default false
   */
  copy?: boolean;

  /**
   * 是否启用化学插件
   *
   * @default false
   */
  mhchem?: boolean;
}

interface MarkdownMathjaxPluginOptions extends Omit<
  MarkdownItMathjaxOptions,
  "transformer"
> {
  type?: "mathjax";

  /**
   * 是否允许两端带空格的内联数学
   *
   * @description 不建议将此设置为 true，因为它很可能会破坏 $ 的默认使用
   *
   * @default false
   */
  allowInlineWithSpace?: boolean;

  /**
   * 输出格式
   *
   * @default 'svg'
   */
  output?: "chtml" | "svg";

  /**
   * 是否启用无障碍
   *
   * @default true
   */
  a11y?: boolean;

  /**
   * TeX 输入选项
   */
  tex?: MathJaxTexInputOptions;

  /**
   * 通用 HTML 输出选项
   */
  chtml?: MathjaxCommonHTMLOutputOptions;

  /**
   * SVG 输出选项
   */
  svg?: MathjaxSVGOutputOptions;
}

type MarkdownMathPluginOptions =
  MarkdownKatexPluginOptions | MarkdownMathjaxPluginOptions;
```

@`markdown.revealjs` type=`RevealJsPluginOptions | boolean`

控制 `@vuepress/plugin-revealjs`，提供幻灯片支持。你可以设置 `true` 来直接启用它，或提供插件选项。

参考：[Markdown → 幻灯片](../../guide/markdown/content/revealjs.md) 与 [@vuepress/plugin-revealjs][revealjs]。

@@`markdown.revealjs.plugins` type=`RevealJsPlugin[]` default=`[]`

要启用的内置 reveal.js 插件。

可选值：`highlight`、`math`、`notes`、`search`、`zoom`。

@@`markdown.revealjs.themes` type=`RevealJsTheme[]` default=`["auto"]`

要启用的主题。

可选值：`auto`、`beige`、`black`、`blood`、`league`、`moon`、`night`、`serif`、`simple`、`sky`、`solarized`、`white`。

:::

[component]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#component
[footnote]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#footenote
[tasklist]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#tasklist
[mark]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#mark
[size]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#size
[obsidianSize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#obsidianSize
[legacySize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#legacySize
[include]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-include.html
[fields]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-field.html#fields
[math]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
[revealjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/#options
[tabs]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-tab.html#tabs
