import type { LocaleConfig } from "@vuepress/core";
import type { KatexOptions } from "katex";
import type { AttrsOptions } from "./attrs";
import type { CodeDemoOptions } from "./codeDemo";
import type { ImageMarkOptions } from "./imageMark";
import type { IncludeOptions } from "./include";
import type { MarkdownEnhanceLocaleData } from "./locales";
import type { PresentationOptions } from "./presentation";
import type { TaskListOptions } from "./tasklist";
import type { StylizeOptions } from "./stylize";

/**
 * md-enhance plugin configuration
 */
export interface MarkdownEnhanceOptions {
  /**
   * Whether check dead links in markdown
   *
   * @description `true` equals to `'always'`, `false` equals to `'never'`
   *
   * @default 'dev'
   */
  linkCheck?: "always" | "dev" | "build" | "never" | boolean;

  /**
   * Whether enable standard GFM support
   *
   * 是否启用标准的 GitHub Favor Markdown 支持
   *
   * @default false
   */
  gfm?: boolean;

  /**
   * Whether to enable custom container including
   *
   * - info
   * - note
   * - tip
   * - warning
   * - danger
   * - details
   *
   * ⚠ The last 4 items conflict with default theme and will override it’s style.
   *
   * 是否启用自定义容器
   *
   * - info
   * - note
   * - tip
   * - warning
   * - danger
   * - details
   *
   * ⚠ 最后四个会和默认主题冲突，且会覆盖默认主题的样式与行为。
   *
   * @default false
   */
  container?: boolean;

  /**
   * Whether to enable v-pre wrapper.
   *
   * 是否启用 v-pre 容器。
   *
   * @default false
   */
  vpre?: boolean;

  /**
   * Whether to enable tabs.
   *
   * 是否启用标签页分组。
   *
   * @default false
   */
  tabs?: boolean;

  /**
   * Whether to enable codetabs.
   *
   * 是否启用代码组。
   *
   * @default false
   */
  codetabs?: boolean;

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
   * Whether enable native image lazy loading
   *
   * 是否启用原生的图片懒加载。
   *
   * @default false
   */
  lazyLoad?: boolean;

  /**
   * Whether to enable gfm image id mark support
   *
   * 是否启用 GFM 图片 ID 标记。
   *
   * @default false
   */
  imageMark?: ImageMarkOptions | boolean;

  /**
   * Whether to enable image size mark support
   *
   * 是否启用图片大小标记支持。
   *
   * @default false
   */
  imageSize?: ImageMarkOptions | boolean;

  /**
   * Whether to enable mark format support
   *
   * 是否启用标注支持。
   *
   * @default false
   */
  mark?: boolean;

  /**
   * Whether to enable tastlist format support
   *
   * 是否启用任务列表支持
   *
   * @default false
   */
  tasklist?: TaskListOptions | boolean;

  /**
   * Whether to enable include syntax support
   *
   * 是否启用导入语法支持
   *
   * @default false
   */
  include?: IncludeOptions;

  /**
   * Whether to enable TeX syntax support
   *
   * @see https://katex.org/docs/options.html
   *
   * 是否启用 TeX 语法支持
   *
   * @see https://katex.org/docs/options.html
   *
   * @default false
   */
  tex?: KatexOptions | boolean;

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
   * Whether to enable mermaid support
   *
   * 是否启用 Mermaid 流程图支持
   *
   * @default false
   */
  mermaid?: boolean;

  /**
   * Whether to enable code-demo support
   *
   * 是否启用代码示例功能
   *
   * @default false
   */
  demo?: Partial<CodeDemoOptions> | boolean;

  /**
   * Whether to enable presentation support
   *
   * 是否启用幻灯片支持
   *
   * @default false
   */
  presentation?: PresentationOptions | boolean;

  /**
   * Keyword enhancement
   *
   * 关键词显示增强选项
   */
  stylize?: StylizeOptions;

  /**
   * @deprecated This option is for demo only, please enable options you need in production.
   *
   * Whether to enable all features.
   *
   * @deprecated 此选项仅用于案例，请在生产环境中启用你需要的选项
   *
   * 是否启用全部增强语法
   *
   * @default false
   */
  enableAll?: boolean;

  /**
   * The delay of operating dom, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * 操作页面 DOM 的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 500
   */
  delay?: number;

  /**
   * Locale config
   *
   * 国际化配置选项
   */
  locales?: LocaleConfig<MarkdownEnhanceLocaleData>;
}
