import type { LocaleConfig } from "@vuepress/core";

import type {
  AttrsOptions,
  FigureOptions,
  ImgMarkOptions,
  IncludeOptions,
  KatexOptions,
  MarkdownEnhanceLocaleData,
  MathjaxOptions,
  PlaygroundOptions,
  RevealJsOptions,
  StylizeOptions,
  TSPresetPlaygroundOptions,
  TasklistOptions,
  UnoPresetPlaygroundOptions,
  VuePresetPlaygroundOptions,
} from "./typings/index.js";
import type { CodeDemoOptions } from "../shared/index.js";

export type LinksCheckStatus = "always" | "dev" | "build" | "never";

export interface LinksCheckOptions {
  /**
   * Whether check dead links in markdown
   *
   * 是否检查 Markdown 中的死链
   *
   * @default "dev"
   */
  status?: LinksCheckStatus;

  /**
   * Dead links to ignore
   *
   * 忽略的死链
   */
  ignore?: (string | RegExp)[] | ((link: string, isDev: boolean) => boolean);
}

/**
 * md-enhance plugin configuration
 */
export interface MarkdownEnhanceOptions {
  /**
   * Whether check dead links in markdown
   *
   * @default { status: "dev"}
   */
  checkLinks?: LinksCheckOptions;

  /**
   * Whether enable standard GFM support
   *
   * 是否启用标准的 GitHub Favor Markdown 支持
   *
   * @default false
   */
  gfm?: boolean;

  /**
   * Whether to enable hint container including
   *
   * - important
   * - info
   * - note
   * - tip
   * - warning
   * - caution
   * - details
   *
   * ⚠ The last 4 items conflict with default theme and will override it’s style.
   *
   * 是否启用提示容器
   *
   * - important
   * - info
   * - note
   * - tip
   * - warning
   * - caution
   * - details
   *
   * ⚠ 最后四个会和默认主题冲突，且会覆盖默认主题的样式与行为。
   *
   * @default false
   */
  hint?: boolean;

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
   * Wether enable gfm alerts
   *
   * 是否启用 gfm 警告
   *
   * @default false
   */
  alert?: boolean;

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
   * Whether render figure with standalone imag
   *
   * 是否将单独的图片渲染为 figure
   *
   * @default false
   */
  figure?: FigureOptions | boolean;

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
  imgLazyload?: boolean;

  /**
   * Whether to enable gfm image id mark support
   *
   * 是否启用 GFM 图片 ID 标记。
   *
   * @default false
   */
  imgMark?: ImgMarkOptions | boolean;

  /**
   * Whether to enable image size mark support
   *
   * 是否启用图片大小标记支持。
   *
   * @default false
   */
  imgSize?: boolean;

  /**
   * Whether to enable obsidian image size mark support
   *
   * 是否启用 obsidian 图片大小标记支持。
   *
   * @default false
   */
  obsidianImgSize?: boolean;

  /**
   * Whether to enable mark format support
   *
   * 是否启用标注支持。
   *
   * @default false
   */
  mark?: boolean;

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
   * Whether to enable katex support
   *
   * @see https://katex.org/docs/options.html
   *
   * 是否启用 katex 语法支持
   *
   * @see https://katex.org/docs/options.html
   *
   * @default false
   */
  katex?:
    | (KatexOptions & {
        /**
         * whether enable copy plugin
         *
         * @default false
         */
        copy?: boolean;
      })
    | boolean;

  /**
   * Whether to enable mathjax support
   *
   * @see http://docs.mathjax.org/en/latest/options/index.html
   *
   * 是否启用 mathjax 语法支持
   *
   * @see http://docs.mathjax.org/en/latest/options/index.html
   *
   * @default false
   */
  mathjax?: MathjaxOptions | boolean;

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
   * Whether to enable code-demo support
   *
   * 是否启用代码示例功能
   *
   * @default false
   */
  demo?: Partial<CodeDemoOptions> | boolean;

  /**
   * Whether to enable reveal.js support
   *
   * 是否启用 Reveal.js 支持
   *
   * @default false
   */
  revealJs?: RevealJsOptions | boolean;

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
  playground?: {
    /** Playground presets */
    presets: ("ts" | "vue" | "unocss" | PlaygroundOptions)[];
    /** Playground config */
    config?: {
      ts?: TSPresetPlaygroundOptions;
      vue?: VuePresetPlaygroundOptions;
      unocss?: UnoPresetPlaygroundOptions;
    };
  };

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
  vuePlayground?: boolean;

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

  /**
   * Locale config
   *
   * 国际化配置选项
   */
  locales?: LocaleConfig<MarkdownEnhanceLocaleData>;
}
