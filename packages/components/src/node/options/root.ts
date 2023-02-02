import { type NoticeOptions } from "../../shared/index.js";

export interface RootComponentOptions {
  /**
   * Add This 的公开 ID
   *
   * Public ID for add this
   */
  addThis?: string;

  /**
   * Whether enabling backToTop button
   *
   *
   * @description When setting a number, it will be used as backToTop button threshold distance (in pixels)
   *
   * 是否启用返回顶部按钮
   *
   * @description 当设置为数字时，将会作为返回顶部按钮距离阈值 (单位: 像素)
   */
  backToTop?: number | boolean;

  /**
   * Global notice config
   *
   * 全局通知配置
   */
  notice?: NoticeOptions[];
}
