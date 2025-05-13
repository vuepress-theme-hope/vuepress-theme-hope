---
title: Markdown 语法配置
icon: b:markdown
order: 2
category:
  - 配置
tag:
  - Markdown 配置
  - 主题配置
---

以下选项在 markdown 中添加了新的语法，可以在主题选项的 `markdown` 属性下进行设置。

## markdown.component

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [组件 → 语法](../../guide/component/grammar.md)
  - [@vuepress/plugin-markdown-ext → component][component]

是否启用组件支持。

## markdown.footnote

- 类型: `boolean`
- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [Markdown → 脚注](../../guide/markdown/content/footnote.md)
  - [@vuepress/plugin-markdown-ext → footnote][footnote]

是否启用脚注格式支持。

## markdown.imgMark

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 图片标记](../../guide/markdown/grammar/image.md#image-mark)
  - [@vuepress/plugin-markdown-image → mark][mark]

是否启用图片标记。

## markdown.imgSize

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 图片大小](../../guide/markdown/grammar/image.md#image-size)
  - [@vuepress/plugin-markdown-image → size][size]

是否启用图片大小。

## markdown.obsidianImgSize

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 图片大小](../../guide/markdown/grammar/image.md#image-size)
  - [@vuepress/plugin-markdown-image → obsidianSize][obsidianSize]

是否启用 Obsidian 图片大小。

## markdown.legacyImgSize (已弃用)

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 图片大小](../../guide/markdown/grammar/image.md#image-size)
  - [@vuepress/plugin-markdown-image → legacySize][legacySize]

是否启用旧版图片大小。

## markdown.include

- 类型: `MarkdownIncludePluginOptions | boolean`

  ```ts
  interface MarkdownIncludePluginOptions {
    /**
     * 处理包含的文件路径
     *
     * @default (path) => path
     */
    resolvePath?: (path: string, cwd: string) => string;

    /**
     * 是否在包含的 Markdown 文件中深度包含文件
     *
     * @default false
     */
    deep?: boolean;
  }
  ```

- 默认值: `false`
- 详情:
  - [Markdown → 导入文件](../../guide/markdown/content/include.md)
  - [@vuepress/plugin-markdown-include][include]

是否启用 Markdown 导入支持。您可以传递一个选项来自定义行为。

## markdown.tabs

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [Markdown → 选项卡](../../guide/markdown/content/tabs.md)
  - [@vuepress/plugin-markdown-tab → tabs][tabs]

是否启用选项卡支持。

## markdown.tasklist

- 类型: `MarkdownItTaskListOptions | boolean`

  ```ts
  interface MarkdownItTaskListOptions {
    /**
     * 是否禁用复选框
     *
     * @default true
     */
    disabled?: boolean;

    /**
     * 是否使用 `<label>` 包装文本
     *
     * @default true
     */
    label?: boolean;
  }
  ```

- 默认值: `false`
- 在 GFM 中启用: 是
- 详情:
  - [Markdown → 任务列表](../../guide/markdown/grammar/tasklist.md)
  - [@vuepress/plugin-markdown-ext → tasklist][tasklist]

是否启用任务列表格式支持。你可以传递一个对象来配置任务列表。

## markdown.math

- 类型: `MarkdownMathPluginOptions | boolean`

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

  interface MarkdownMathjaxPluginOptions
    extends Omit<MarkdownItMathjaxOptions, "transformer"> {
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
    | MarkdownKatexPluginOptions
    | MarkdownMathjaxPluginOptions;
  ```

- 默认值: `false`
- 详情:
  - [Markdown → 数学公式](../../guide/markdown/grammar/math.md)
  - [@vuepress/plugin-markdown-math][math]

是否启用数学公式支持。你可以设置 `true` 来自动检测已安装的 katex/mathjax，或提供插件选项。

## markdown.revealjs

- 类型: `RevealJsPluginOptions | boolean`

  ```ts
  type RevealJsPlugin = "highlight" | "math" | "notes" | "search" | "zoom";

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

  interface RevealJsPluginOptions {
    /**
     * 幻灯片插件
     *
     * @default []
     */
    plugins?: RevealJsPlugin[];
    /**
     * 幻灯片主题
     *
     * @default ["auto"]
     */
    themes?: RevealJsTheme[];
  }
  ```

- 默认值: `false`
- 详情:
  - [Markdown → 幻灯片](../../guide/markdown/content/revealjs.md)
  - [@vuepress/plugin-revealjs][revealjs]

控制 `@vuepress/plugin-revealjs`，提供幻灯片支持。你可以设置 `true` 来直接启用它，或提供插件选项。

[component]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#component
[footnote]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#footenote
[tasklist]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-ext.html#tasklist
[mark]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#mark
[size]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#size
[obsidianSize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#obsidianSize
[legacySize]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-image.html#legacySize
[include]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-include.html
[math]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-math.html
[revealjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/#options
[tabs]: https://ecosystem.vuejs.press/zh/plugins/markdown/markdown-tab.html#tabs
