import type { BackToTopOptions } from "./backToTop.js";
import type { NoticeOptions } from "../../shared/index.js";

export interface RootComponentOptions {
  /**
   * @deprecated Please use "@vuepress/plugin-back-to-top instead"
   *
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
