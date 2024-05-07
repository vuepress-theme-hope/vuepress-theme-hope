import type { NoticeOptions } from "../../shared/index.js";

export interface RootComponentOptions {
  // TODO: Remove in v2 stable
  /**
   * @deprecated Please use "@vuepress/plugin-back-to-top instead"
   */
  backToTop?: never;

  /**
   * Global notice config
   *
   * 全局通知配置
   */
  notice?: NoticeOptions[];
}
