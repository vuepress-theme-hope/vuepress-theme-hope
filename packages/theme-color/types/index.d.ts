/** 主题色选项 */
export type ThemeColorOptions = Partial<{
  /** 是否开启主题色 */
  allowThemeColor: boolean;
  /** 颜色选择器 */
  picker: Record<string, string>;
  /** 是否允许开启暗黑模式 */
  allowDarkmode: boolean;
}>;

/** 声明全局变量 */
declare global {
  const THEME_COLOR_OPTIONS: ThemeColorOptions;
}
