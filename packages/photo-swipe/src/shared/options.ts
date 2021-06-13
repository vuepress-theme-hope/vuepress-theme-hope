import type { LocaleConfig } from "@vuepress/core";
import type PhotoSwipe from "photoswipe";
import type { PhowoSwipeI18nConfig } from "./locales";

export interface PhotoSwipeOptions {
  /**
   * 图片选择器
   *
   * Image selector
   *
   * @default '.theme-default-content :not(a) > img'
   */
  selector?: string;
  /**
   * photo-swipe 抓取页面图片的延时，单位 ms
   *
   * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
   *
   * The delay of photo-swipe fetching page images, in ms
   *
   * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
   *
   * @default 500
   */
  delay?: number;
  /**
   * 传递给 photo-swipe 的额外选项
   *
   * Options which will pass to `photo-swipe`
   */
  options?: PhotoSwipe.Options;

  locale?: LocaleConfig<PhowoSwipeI18nConfig>;
}
