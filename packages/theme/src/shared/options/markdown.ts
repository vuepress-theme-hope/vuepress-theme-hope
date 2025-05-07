import type { LinksCheckPluginOptions } from "@vuepress/plugin-links-check";
import type { MarkdownExtPluginOptions } from "@vuepress/plugin-markdown-ext";
import type { MarkdownHintPluginOptions } from "@vuepress/plugin-markdown-hint";
import type { MarkdownImagePluginOptions } from "@vuepress/plugin-markdown-image";
import type { MarkdownIncludePluginOptions } from "@vuepress/plugin-markdown-include";
import type { MarkdownMathPluginOptions } from "@vuepress/plugin-markdown-math";
import type { MarkdownStylizePluginOptions } from "@vuepress/plugin-markdown-stylize";
import type { MarkdownTabPluginOptions } from "@vuepress/plugin-markdown-tab";
import type { PrismjsPluginOptions } from "@vuepress/plugin-prismjs";
import type { RevealJsPluginOptions } from "@vuepress/plugin-revealjs";
import type { ShikiPluginOptions } from "@vuepress/plugin-shiki";
import type { MarkdownEnhancePluginOptions } from "vuepress-plugin-md-enhance";

export type MarkdownHighlighterOptions =
  | ({ type: "prismjs" } & PrismjsPluginOptions)
  | ({ type: "shiki" } & ShikiPluginOptions);

export interface MarkdownOptions
  extends MarkdownExtPluginOptions,
    Pick<MarkdownHintPluginOptions, "alert" | "hint">,
    Pick<MarkdownImagePluginOptions, "figure">,
    Omit<MarkdownStylizePluginOptions, "custom">,
    MarkdownTabPluginOptions,
    Pick<
      MarkdownEnhancePluginOptions,
      | "chartjs"
      | "echarts"
      | "flowchart"
      | "markmap"
      | "mermaid"
      | "plantuml"
      | "demo"
      | "playground"
      | "kotlinPlayground"
      | "vuePlayground"
      | "sandpack"
    > {
  /**
   * Options for @vuepress/links-check
   *
   * @see https://ecosystem.vuejs.press/plugins/markdown/links-check.html
   *
   * @vuepress/links-check 插件配置
   *
   * @see https://ecosystem.vuejs.press/zh/plugins/markdown/links-check.html
   */
  linksCheck?: LinksCheckPluginOptions | boolean;

  /**
   * Whether enable native image lazy loading
   *
   * 是否启用原生的图片懒加载。
   *
   * @default false
   */
  imgLazyload?: MarkdownImagePluginOptions["lazyload"];

  /**
   * Whether to enable gfm image id mark support
   *
   * 是否启用 GFM 图片 ID 标记。
   *
   * @default false
   */
  imgMark?: MarkdownImagePluginOptions["mark"];

  /**
   * Whether to enable image size mark support
   *
   * 是否启用图片大小标记支持。
   *
   * @default false
   */
  imgSize?: MarkdownImagePluginOptions["size"];

  /**
   *
   * Whether to enable obsidian image size mark support
   *
   * 是否启用 Obsidian 图片大小标记支持。
   *
   * @default false
   */
  obsidianImgSize?: MarkdownImagePluginOptions["obsidianSize"];

  /**
   * @deprecated
   *
   * Whether to enable legacy image size mark support
   *
   * 是否启用旧版图片大小标记支持。
   *
   * @default false
   */
  legacyImgSize?: MarkdownImagePluginOptions["legacySize"];

  /**
   * Whether to enable markdown include support
   *
   * 是否启用 markdown include 支持。
   *
   * @default false
   */
  include?: MarkdownIncludePluginOptions | boolean;

  /**
   * Whether to enable markdown math support
   *
   * 是否启用 markdown math 支持。
   *
   * @default false
   */
  math?: MarkdownMathPluginOptions | boolean;

  /**
   * Customizing token stylize
   *
   * 自定义标记样式
   */
  stylize?: MarkdownStylizePluginOptions["custom"];

  /**
   * Whether to enable revealjs support
   *
   * 是否启用 revealjs 支持
   */
  revealjs?: Omit<RevealJsPluginOptions, "layout"> | boolean;

  /**
   * Markdown highlighter options
   *
   * Markdown 高亮器选项
   *
   * @default "shiki"
   */
  highlighter?: MarkdownHighlighterOptions | "prismjs" | "shiki" | false;
}
