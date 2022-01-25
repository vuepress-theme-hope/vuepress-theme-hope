import type { LocaleConfig } from "@vuepress/core";
import type { KatexOptions } from "katex";
import type { CodeDemoOptions } from "./code-demo";
import type { MarkdownEnhanceLocaleData } from "./locales";
import type { PresentationOptions } from "./presentation";
import type { TaskListOptions } from "./tasklist";

/**
 * md-enhance plugin configuration
 */
export type MarkdownEnhanceOptions = Partial<{
  /**
   * 是否启用自定义容器
   *
   * - info
   * - note
   * - tip
   * - warning
   * - danger
   * - details
   *
   * ⚠ 最后四个会和默认主题冲突，且可能会覆盖默认主题的样式与行为
   *
   * Whether to enable custom container including
   *
   * - info
   * - note
   * - tip
   * - warning
   * - danger
   * - details
   *
   * ⚠ The last 4 is conflict with default theme and may overide it.
   *
   * @default false
   */
  container: boolean;

  /**
   * 是否启用代码组
   *
   * Whether to enable codegroup
   *
   * @default false
   */
  codegroup: boolean;

  /**
   * 是否启用自定义对齐支持
   *
   * Whether to enable align support
   *
   * @default false
   */
  align: boolean;

  /**
   * 是否启用上角标格式支持
   *
   * Whether to enable superscript format support
   *
   * @default false
   */
  sup: boolean;

  /**
   * 是否启用下角标格式支持
   *
   * Whether to enable subscript format support
   *
   * @default false
   */
  sub: boolean;

  /**
   * 是否启用脚注格式支持
   *
   * Whether to enable footnote format support
   *
   * @default false
   */
  footnote: boolean;

  /**
   * Whether enable native image lazy loading
   *
   * 是否启用原生的图片懒加载
   *
   * @default false
   */
  lazyLoad?: boolean;

  /**
   * 是否启用标注支持
   *
   * Whether to enable mark format support
   *
   * @default false
   */
  mark: boolean;

  /**
   * Whether to enable tastlist format support
   *
   * 是否启用任务列表支持
   *
   * @default false
   */
  tasklist: TaskListOptions | boolean;

  /**
   * Whether to enable TeX syntax support
   *
   * 是否启用 TeX 语法支持
   *
   * @default false
   */
  tex: KatexOptions | boolean;

  /**
   * Whether to enable mermaid support
   *
   * 是否启用 Mermaid 流程图支持
   *
   * @default false
   */
  mermaid: boolean;

  /**
   * Whether to enable code-demo support
   *
   * 是否启用代码示例功能
   *
   * @default false
   */
  demo: Partial<CodeDemoOptions> | boolean;

  /**
   * Whether to enable presentation support
   *
   * 是否启用幻灯片支持
   *
   * @default false
   */
  presentation: PresentationOptions | boolean;

  /**
   * Whether to enable all features.
   *
   * 是否启用全部增强语法
   *
   * @default false
   */
  enableAll: boolean;

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
}>;
