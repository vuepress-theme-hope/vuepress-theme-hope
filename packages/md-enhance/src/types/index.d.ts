import { Mermaid } from "mermaid";
import type { KatexOptions } from "katex";
import type { RevealOptions } from "reveal.js";
import "./declare";

export interface CodeDemoOptions {
  /**
   * 是否使用 Babel 转义
   *
   * @default false
   */
  useBabel: boolean;

  /**
   * 引入的 JS 外部库链接
   *
   * JS Libray links
   */
  jsLib: string[];
  /**
   * 引入的 CSS 外部库链接
   *
   * CSS Libray links
   */
  cssLib: string[];
  /**
   * 是否显示 JSFiddle 按钮
   *
   * Whether display JSFiddle button
   *
   * @default true
   */
  jsfiddle?: boolean;
  /**
   * 是否显示 CodePen 按钮
   *
   * Whether display CodePen button
   *
   * @default true
   */
  codepen?: boolean;
  /**
   * CodePen 编辑器布局
   *
   * CodePen editor layout
   *
   * @default "left"
   */
  codepenLayout: "top" | "left" | "right";
  /**
   * CodePen 编辑器显示情况
   *
   * CodePen Editor Display
   *
   * @default "101"
   */
  codepenEditors: "101" | "100" | "110" | "111" | "011" | "001" | "010";

  /**
   * Babel lib address
   *
   * @default "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"
   */
  babel: string;

  /**
   * Vue lib address
   *
   * @default "https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"
   */
  vue: string;
  /**
   * React lib address
   *
   * @default "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
   */
  react: string;
  /**
   * ReactDOM lib address
   *
   * @default "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
   */
  reactDOM: string;
}

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

export interface TaskListOptions {
  /**
   * Whether use `<label>` to wrap text
   *
   * 是否使用 `<label>` 来包裹文字
   *
   * @default true
   */
  label?: boolean;
  /**
   * Whether place `<label>` after `<input>` or wrap `<input>`
   *
   * 是否将 `<label>` 放置在 `<input>` 后还是包裹住 `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}

/** md-enhance plugin configuration */
export type MarkdownEnhanceOptions = Partial<{
  /**
   * 是否在每个代码块的左侧显示行号
   *
   * Whether to show line numbers to the left of each code block
   *
   * @default true
   */
  lineNumbers: boolean;
  /**
   * 是否修复包含特殊字符的图片路径
   *
   * Whether to fix image links containing special characters
   *
   * @default true
   */
  imageFix: boolean;
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
   * 是否启用任务里表支持
   *
   * Whether to enable tastlist format support
   *
   * @default false
   */
  tasklist: TaskListOptions | boolean;
  /**
   * 是否启用 TeX 语法支持
   *
   * Whether to enable TeX syntax support
   *
   * @default false
   */
  tex: KatexOptions | boolean;
  /**
   * 是否启用 flowchart 流程图支持
   *
   * Whether to enable flowchart support
   *
   * @default false
   */
  flowchart: boolean;
  /**
   * 是否启用 Mermaid 流程图支持
   *
   * Whether to enable mermaid support
   *
   * @default false
   */
  mermaid: boolean;
  /**
   * 是否启用代码示例功能
   *
   * Whether to enable code-demo support
   *
   * @default false
   */
  demo: Partial<CodeDemoOptions> | boolean;
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
  const CODE_DEMO_OPTIONS: CodeDemoOptions;
  const MARKDOWN_ENHANCE_ALIGN: boolean;
  const MARKDOWN_ENHANCE_FLOWCHART: boolean;
  const MARKDOWN_ENHANCE_FOOTNOTE: boolean;
  const MARKDOWN_ENHANCE_MERMAID: boolean;
  const MARKDOWN_ENHANCE_PRESENTATION: boolean;
  const MARKDOWN_ENHANCE_TASKLIST: boolean;
  const MARKDOWN_ENHANCE_TEX: boolean;
  const MERMAID_OPTIONS: Mermaid.mermaidAPI.Config;
  const REVEAL_CONFIG: Partial<RevealOptions>;
  const REVEAL_PLUGIN_HIGHLIGHT: boolean;
  const REVEAL_PLUGIN_MATH: boolean;
  const REVEAL_PLUGIN_NOTES: boolean;
  const REVEAL_PLUGIN_SEARCH: boolean;
  const REVEAL_PLUGIN_ZOOM: boolean;
}
