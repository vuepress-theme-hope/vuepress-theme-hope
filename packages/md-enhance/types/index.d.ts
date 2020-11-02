import { Langs } from "@mr-hope/vuepress-shared-utils";
import { RevealOptions } from "reveal.js";
import "./declare";

export type RevealPlugin =
  | "highlight"
  | "math"
  | "search"
  | "notes"
  | "zoom"
  | "anything"
  | "audio"
  | "chalkboard";

export interface PresentationOptions {
  plugins?: RevealPlugin[];
  revealConfig?: Partial<RevealOptions>;
}

/** md-enhance plugin configuration */
export type MarkdownEnhanceOptions = Partial<{
  /**
   * 主目录所对应的语言。
   *
   * The language of the home directory.
   *
   * @default 'en-US'
   */
  baseLang?: Langs;
  /**
   * 是否在每个代码块的左侧显示行号
   *
   * Whether to show line numbers to the left of each code block
   *
   * @default true
   */
  lineNumbers: boolean;
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
   * 是否启用标注支持
   *
   * Whether to enable mark format support
   *
   * @default false
   */
  mark: boolean;
  /**
   * 是否启用 TeX 语法支持
   *
   * Whether to enable TeX syntax support
   *
   * @default false
   */
  tex: boolean;
  /**
   * 是否启用流程图支持
   *
   * Whether to enable flowchart support
   *
   * @default false
   */
  flowchart: boolean;
  /**
   * 是否启用幻灯片支持
   *
   * Whether to enable presentation support
   *
   * @default false
   */
  presentation: PresentationOptions | boolean;
  /**
   * 是否启用全部增强
   *
   * Whether to enable all features.
   *
   * @default false
   */
  enableAll: boolean;
}>;

declare global {
  const REVEAL_CONFIG: Partial<RevealOptions>;
  const REVEAL_PLUGINS: string[];
  const MARKDOWN_ENHANCE_OPTIONS: MarkdownEnhanceOptions;
}
