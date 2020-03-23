import './declare';

/** md-enhance 插件配置 */
export type MarkdownEnhanceOption = Partial<{
  /** 默认目录的语言 */
  baseLang: string;
  /** 在每个代码块的左侧显示行号 */
  lineNumbers: boolean;
  /** 启用自定义对齐支持 */
  align: boolean;
  /** 启用上角标格式支持 */
  sup: boolean;
  /** 启用下角标格式支持 */
  sub: boolean;
  /** 启用脚注格式支持 */
  footnote: boolean;
  /** 启用 TeX 语法支持 */
  tex: boolean;
  /** 启用 流程图 语法支持 */
  flowchart: boolean;
  /** 启用全部增强 */
  enableAll: boolean;
}>;
