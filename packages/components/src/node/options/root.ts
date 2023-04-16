import { type BackToTopOptions } from "./backToTop.js";
import { type NoticeOptions } from "../../shared/index.js";

export interface RootComponentOptions {
  /**
   * Add This 的公开 ID
   *
   * Public ID for add this
   */
  addThis?: string;

  /**
   * Back to top button config
   *
   * 返回顶部按钮配置
   */
  backToTop?: BackToTopOptions | boolean;

  /**
   * Global notice config
   *
   * 全局通知配置
   */
  notice?: NoticeOptions[];
}
