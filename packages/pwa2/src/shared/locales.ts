import type { ConvertLocaleConfig } from "vuepress-shared";

export interface PWALocaleData {
  /**
   * Install button text
   *
   * 安装按钮文字
   */
  install: string;

  /**
   * iOS install hint text
   *
   * iOS 安装文字
   */
  iOSInstall: string;

  /**
   * Cancel button text
   *
   * 取消按钮文字
   */
  cancel: string;

  /**
   * Close button text
   *
   * 关闭按钮文字
   */
  close: string;

  /**
   * Previous image text
   *
   * 上一张图片文字
   */
  prevImage: string;

  /**
   * Next image text
   *
   * 下一张图片文字
   */
  nextImage: string;

  /**
   * Install explain text
   *
   * 安装解释
   */
  explain: string;

  /**
   * Description label text
   *
   * 描述标签文字
   */
  desc: string;

  /**
   * Feature label text
   *
   * 特性标签文字
   */
  feature: string;

  /**
   * Update hint text
   *
   * 提示有更新文字
   */
  hint: string;

  /**
   * Update available text
   *
   * 更新可用文字
   */
  update: string;
}

export type PWALocaleConfig = ConvertLocaleConfig<PWALocaleData>;
