import type { MarkdownItPlantumlOptions } from "@mdit/plugin-plantuml";

import type {
  PlaygroundGlobalOptions,
  VuePlaygroundOptions,
} from "./typings/index.js";
import type { CodeDemoOptions } from "../shared/index.js";

export interface DeprecatedMarkdownEnhancePluginOptions {
  /**
   * @deprecated use `chartjs` instead
   */
  chartjs?: boolean;

  /**
   * @deprecated use `alert` from `@vuepress/plugin-markdown-hint` instead
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
   * @deprecated use `figure` from `@vuepress/plugin-markdown-image` instead
   */
  figure?: never;

  /**
   * @deprecated use `lazyload` in `@vuepress/plugin-markdown-image` instead
   */
  imgLazyload?: never;

  /**
   * @deprecated use `mark` from `@vuepress/plugin-markdown-image` instead
   */
  imgMark?: never;

  /**
   * @deprecated use `size` from `@vuepress/plugin-markdown-image` instead
   */
  imgSize?: never;

  /**
   * @deprecated use `obsidianSize` from `@vuepress/plugin-markdown-image` instead
   */
  obsidianImgSize?: never;

  /**
   * @deprecated use `tabs` from `@vuepress/plugin-markdown-tab` instead
   */
  tabs?: never;

  /**
   * @deprecated use `codeTabs` from `@vuepress/plugin-markdown-tab` instead
   */
  codetabs?: never;

  /**
   * @deprecated use `@vuepress/plugin-revealjs` instead
   */
  revealJs?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-ext` instead
   */
  footnote?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-ext` instead
   */
  tasklist?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-ext` instead
   */
  gfm?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-ext` instead
   */
  vPre?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-ext` instead
   */
  breaks?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-ext` instead
   */
  linkify?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-ext` instead
   */
  component?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-stylize` instead
   */
  align?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-stylize` instead
   */
  attrs?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-stylize` instead
   */
  sup?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-stylize` instead
   */
  sub?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-stylize` instead
   */
  mark?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-stylize` instead
   */
  spoiler?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-stylize` instead
   */
  stylize?: never;

  /**
   * @deprecated use `@vuepress/plugin-markdown-include` instead
   */
  include?: never;
}

/**
 * md-enhance plugin configuration
 */
export interface MarkdownEnhancePluginOptions
  extends DeprecatedMarkdownEnhancePluginOptions {
  /**
   * Whether to enable chart support
   *
   * 是否启用 chart 图表支持
   *
   * @default false
   */
  chartjs?: boolean;

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
