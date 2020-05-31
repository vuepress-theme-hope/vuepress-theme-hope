import "./declare";

/** md-enhance plugin configuration */
export type MarkdownEnhanceOption = Partial<{
  /**
   * 主目录所对应的语言。
   *
   * The language of the home directory.
   */
  baseLang: string;
  /**
   * 是否在每个代码块的左侧显示行号
   *
   * Whether to show line numbers to the left of each code block
   */
  lineNumbers: boolean;
  /**
   * 是否启用自定义对齐支持
   *
   * Whether to enable align support
   */
  align: boolean;
  /**
   * 是否启用上角标格式支持
   *
   * Whether to enable superscript format support
   */
  sup: boolean;
  /**
   * 是否启用下角标格式支持
   *
   * Whether to enable subscript format support
   */
  sub: boolean;
  /**
   * 是否启用脚注格式支持
   *
   * Whether to enable footnote format support
   */
  footnote: boolean;
  /**
   * 是否启用标注支持
   *
   * Whether to enable mark format support
   */
  mark: boolean;
  /**
   * 是否启用 TeX 语法支持
   *
   * Whether to enable TeX syntax support
   */
  tex: boolean;
  /**
   * 是否启用流程图语法支持
   *
   * Whether to enable flowchart syntax support
   */
  flowchart: boolean;
  /**
   * 是否启用全部增强
   *
   * Whether to enable all features.
   */
  enableAll: boolean;
}>;
