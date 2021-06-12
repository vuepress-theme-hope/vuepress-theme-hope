import type { LocaleConfig } from "@vuepress/core";
import type { CopyCodeI18nConfig } from "./locales";

export interface CopyCodeOptions {
  /**
   * 代码块选择器
   *
   * Code block selector
   *
   * @default '.theme-default-content div[class*="language-"] pre'
   */
  selector?: string | string[];
  /**
   * 提示消息显示时间
   *
   * Prompt message display time
   *
   * @default 300
   */
  duration?: number;
  /**
   * 是否展示在移动端
   *
   * Whether to display on the mobile side
   *
   * @default false
   */
  showInMobile?: boolean;
  /**
   * 注册复制按钮的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * The delay of registering copy code buttons, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * @default 500
   */
  delay?: number;

  locale?: LocaleConfig<CopyCodeI18nConfig>;
}
