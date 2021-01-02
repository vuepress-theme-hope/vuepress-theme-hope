import { HopeLangI18nConfigItem } from "./i18n";

/** vuepress-theme-hope 国际化配置 */
export interface HopeLangI18nConfig extends HopeLangI18nConfigItem {
  /** 当前语言代码 */
  lang?: string;
  /** 多语言下拉菜单的标题 */
  selectText?: string;
  /** 该语言下的更新时间文字 */
  lastUpdated?: string;
  /** 该语言在下拉菜单中的标签 */
  label?: string;
  /** 辅助标签 */
  ariaLabel?: string;
  /** 编辑链接文字 */
  editLinkText?: string; // 默认为 "Edit this page"
}
