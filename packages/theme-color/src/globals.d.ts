/** 主题色选项 */
interface ThemeColorOptions {
  /** 是否开启主题色 */
  allowThemeColor?: boolean;
  /** 颜色选择器 */
  picker?: Record<string,string>;
  /** 是否允许开启夜间模式 */
  allowNightmode?: boolean;
}

/** 主题颜色配置选项 */
declare const THEME_COLOR_OPTIONS: ThemeColorOptions;
