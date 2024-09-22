import type { MarkdownItPlantumlOptions } from "@mdit/plugin-plantuml";

import type {
  AttrsOptions,
  IncludeOptions,
  PlaygroundGlobalOptions,
  StylizeOptions,
  TasklistOptions,
  VuePlaygroundOptions,
} from "./typings/index.js";
import type { CodeDemoOptions } from "../shared/index.js";

export interface DeprecatedMarkdownEnhancePluginOptions {
  /**
   * @deprecated use `@vuepress/plugin-markdown-hint` instead
   */
  alert?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-hint` instead
   */
  hint?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-math` instead
   */
  katex?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-math` instead
   */
  mathjax?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-image` instead
   */
  figure?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-image` instead
   */
  imgLazyload?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-image` instead
   */
  imgMark?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-image` instead
   */
  imgSize?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-image` instead
   */
  obsidianImgSize?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-tab` instead
   */
  tabs?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-tab` instead
   */
  codetabs?: never;

  /**
   * @deprecated use `@vuepress/plugin-revealjs` instead
   */
  revealJs?: never;
}

/**
 * md-enhance plugin configuration
 */
export interface MarkdownEnhancePluginOptions
  extends DeprecatedMarkdownEnhancePluginOptions {
  /**
   * Whether enable standard GFM support
   *
   * 是否启用标准的 GitHub Favor Markdown 支持
   *
   * @default false
   */
  gfm?: boolean;

  /**
   * Whether to enable v-pre wrapper.
   *
   * 是否启用 v-pre 容器。
   *
   * @default false
   */
  vPre?: boolean;

  /**
   * Whether convert `\n` in paragraphs into `<br>`s
   *
   * 是否将段落中的 `\n` 转换为 `<br>`
   *
   * @description enabled in gfm mode
   *
   * @default false
   */
  breaks?: boolean;

  /**
   * Whether convert URL-like text into links
   *
   * 是否将文字中的链接格式文字转换为链接
   *
   * @description enabled in gfm mode
   *
   * @default false
   */
  linkify?: boolean;

  /**
   * Whether to enable align support
   *
   * 是否启用自定义对齐支持。
   *
   * @default false
   */
  align?: boolean;

  /**
   * Whether to enable attr support
   *
   * 是否启用属性支持。
   *
   * @default false
   */
  attrs?: AttrsOptions | boolean;

  /**
   * Whether to enable superscript format support
   *
   * 是否启用上角标格式支持。
   *
   * @default false
   */
  sup?: boolean;

  /**
   * Whether to enable subscript format support
   *
   * 是否启用下角标格式支持。
   *
   * @default false
   */
  sub?: boolean;

  /**
   * Whether to enable footnote format support
   *
   * 是否启用脚注格式支持。
   *
   * @default false
   */
  footnote?: boolean;

  /**
   * Whether to enable mark format support
   *
   * 是否启用标注支持。
   *
   * @default false
   */
  mark?: boolean;

  /**
   * Whether to enable spoiler support
   *
   * 是否启用剧透支持
   *
   * @default false
   */
  spoiler?: boolean;

  /**
   * Whether to enable tasklist format support
   *
   * 是否启用任务列表支持
   *
   * @default false
   */
  tasklist?: TasklistOptions | boolean;

  /**
   * Whether to enable include syntax support
   *
   * 是否启用导入语法支持
   *
   * @default false
   */
  include?: Partial<IncludeOptions> | boolean;

  /**
   * Whether to enable component support
   *
   * 是否启用组件支持
   *
   * @default false
   */
  component?: boolean;

  /**
   * Whether to enable chart support
   *
   * 是否启用 chart 图表支持
   *
   * @default false
   */
  chart?: boolean;

  /**
   * Whether to enable echarts support
   *
   * 是否启用 echarts 图表支持
   *
   * @default false
   */
  echarts?: boolean;

  /**
   * Whether to enable flowchart support
   *
   * 是否启用 flowchart 流程图支持
   *
   * @default false
   */
  flowchart?: boolean;

  /**
   * Whether to enable markmap support
   *
   * 是否启用 markmap 流程图支持
   *
   * @default false
   */
  markmap?: boolean;

  /**
   * Whether to enable mermaid support
   *
   * 是否启用 Mermaid 流程图支持
   *
   * @default false
   */
  mermaid?: boolean;

  /**
   * Whether enable plantuml support
   *
   * 是否启用 plantuml 支持
   *
   * @default false
   */
  plantuml?: MarkdownItPlantumlOptions[] | boolean;

  /**
   * Whether to enable code-demo support
   *
   * 是否启用代码示例功能
   *
   * @default false
   */
  demo?: Partial<CodeDemoOptions> | boolean;

  /**
   * Keyword enhancement
   *
   * 关键词显示增强选项
   */
  stylize?: StylizeOptions;

  /**
   * Whether to enable playground support
   *
   * 是否启用 playground 支持
   */
  playground?: PlaygroundGlobalOptions;

  /**
   * Whether to enable kotlin playground support
   *
   * 是否启用 kotlin Playground 支持
   *
   * @default false
   */
  kotlinPlayground?: boolean;

  /**
   * Whether to enable vue playground support
   *
   * 是否启用 Vue Playground 支持
   *
   * @default false
   */
  vuePlayground?: VuePlaygroundOptions | boolean;

  /**
   * Whether to enable sandpack support
   *
   * 是否启用 Sandpack 支持
   *
   * @default false
   */
  sandpack?: boolean;

  /**
   * The delay of operating dom, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * 操作页面 DOM 的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 800
   */
  delay?: number;
}
