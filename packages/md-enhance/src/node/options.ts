import type {
  PlaygroundGlobalOptions,
  VuePlaygroundOptions,
} from "./typings/index.js";
import type { CodeDemoOptions } from "../shared/index.js";

export interface DeprecatedMarkdownEnhancePluginOptions {
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

  /**
   * @deprecated use `chartjs` from `@vuepress/plugin-markdown-chart` instead
   */
  chart?: boolean;

  /**
   * @deprecated use `chartjs` from `@vuepress/plugin-markdown-chart` instead
   */
  chartjs?: never;

  /**
   * @deprecated use `echarts` from `@vuepress/plugin-markdown-chart` instead
   */
  echarts?: never;

  /**
   * @deprecated use `flowchart` from `@vuepress/plugin-markdown-chart` instead
   */
  flowchart?: never;

  /**
   * @deprecated use `markmap` from `@vuepress/plugin-markdown-chart` instead
   */
  markmap?: never;

  /**
   * @deprecated use `mermaid` from `@vuepress/plugin-markdown-chart` instead
   */
  mermaid?: never;

  /**
   * @deprecated use `plantuml` from `@vuepress/plugin-markdown-chart` instead
   */
  plantuml?: never;
}

/**
 * md-enhance plugin configuration
 */
export interface MarkdownEnhancePluginOptions extends DeprecatedMarkdownEnhancePluginOptions {
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
}
