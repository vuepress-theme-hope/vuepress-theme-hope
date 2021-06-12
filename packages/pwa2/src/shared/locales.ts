import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PWAI18nConfig {
  /** 安装文字 */
  install: string;
  /** iOS 安装文字 */
  iOSInstall: string;
  /** 取消文字 */
  cancel: string;
  /** 关闭 */
  close: string;
  /** 上一张图片 */
  prevImage: string;
  /** 下一张图片 */
  nextImage: string;
  /** 安装解释 */
  explain: string;
  /** 描述 */
  desc: string;
  /** 特性文字 */
  feature: string;
  /** 更新内容文字 */
  update: string;
}

export type PWALocaleConfig = ResolvedLocaleConfig<PWAI18nConfig>;
