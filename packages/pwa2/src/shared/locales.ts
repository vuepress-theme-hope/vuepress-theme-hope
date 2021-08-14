import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PWAI18nConfig {
  /**
   * 安装按钮文字
   *
   * Install button text
   */
  install: string;

  /**
   * iOS 安装文字
   *
   * iOS install hint text
   */
  iOSInstall: string;

  /**
   * 取消按钮文字
   *
   * Cancel button text
   */
  cancel: string;

  /**
   * 关闭按钮文字
   *
   * Close button text
   */
  close: string;

  /**
   * 上一张图片文字
   *
   * Previous image text
   */
  prevImage: string;

  /**
   * 下一张图片文字
   *
   * Next image text
   */
  nextImage: string;

  /**
   * 安装解释
   *
   * Install explain text
   */
  explain: string;

  /**
   * 描述标签文字
   *
   * Description label text
   */
  desc: string;

  /**
   * 特性标签文字
   *
   * Feature label text
   */
  feature: string;

  /**
   * 更新内容标签文字
   *
   * Update label text
   */
  update: string;
}

export type PWALocaleConfig = ResolvedLocaleConfig<PWAI18nConfig>;
