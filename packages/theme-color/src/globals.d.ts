/** 主题色选项 */
export interface ThemeColorOptions {
  /** 是否开启主题色 */
  allowThemeColor?: boolean;
  /** 颜色选择器 */
  picker?: Record<string,string>;
  /** 是否允许开启夜间模式 */
  allowNightmode?: boolean;
}

/** 声明全局变量 */
declare global {
  const THEME_COLOR_OPTIONS: ThemeColorOptions;
}
