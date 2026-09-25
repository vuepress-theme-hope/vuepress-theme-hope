import type { ShareOptions } from "./share.js";

export interface DeprecatedComponentGlobalOptions {
  /** @deprecated Use `@vuepress/plugin-icon` instead */
  fontIcon?: never;
}

export interface ComponentGlobalOptions extends DeprecatedComponentGlobalOptions {
  /**
   * Share config
   *
   * 分享配置
   */
  share?: ShareOptions;
}
