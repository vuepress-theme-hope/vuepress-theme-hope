import type { ShareOptions } from "./share.js";
import type { ArtPlayerOptions } from "../../shared/index.js";

export interface DeprecatedComponentGlobalOptions {
  /**
   * @deprecated Use `@vuepress/plugin-icon` instead
   */
  fontIcon?: never;
}

export interface ComponentGlobalOptions
  extends DeprecatedComponentGlobalOptions {
  /**
   * ArtPlayer config
   *
   * ArtPlayer 配置
   */
  artPlayer?: ArtPlayerOptions;

  /**
   * PDF viewer config
   *
   * PDF 阅读器配置
   */
  pdf?: {
    /**
     * Location of pdfjs
     *
     * pdfjs 的位置
     */
    pdfjs?: string | boolean;
  };

  /**
   * Share config
   *
   * 分享配置
   */
  share?: ShareOptions;
}
