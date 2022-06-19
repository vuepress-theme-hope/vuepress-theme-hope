import type { LocaleConfig } from "@vuepress/core";
import type { CopyCodeLocaleData } from "./locales";

export interface CopyCodeOptions {
  /**
   * Code block selector
   *
   * 代码块选择器
   *
   * @default '.theme-default-content div[class*="language-"] pre'
   */
  selector?: string | string[];

  /**
   * Prompt message display time
   *
   * @description setting it to `0` will disable the hint.
   *
   * 提示消息显示时间
   *
   * @description 设置为 `0` 会禁用提示。
   *
   * @default 300
   */
  duration?: number;

  /**
   * Whether to display on the mobile side
   *
   * 是否展示在移动端
   *
   * @default false
   */
  showInMobile?: boolean;

  /**
   * The delay of registering copy code buttons, in ms.
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`.
   *
   * 注册复制按钮的延时，单位 ms。
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * @default 500
   */
  delay?: number;

  /**
   * Whether use non-fancy styles
   *
   * 是否启用非华丽样式
   */
  pure?: boolean;

  /**
   * Locale config
   *
   * 国际化配置
   */
  locales?: LocaleConfig<CopyCodeLocaleData>;
}
