import type { FontIconOptions } from "./icon.js";
import type { ShareOptions } from "./share.js";
import type { ArtPlayerOptions } from "../../shared/index.js";

export interface ComponentGlobalOptions {
  /**
   * ArtPlayer config
   *
   * ArtPlayer 配置
   */
  artPlayer?: ArtPlayerOptions;

  /**
   * FontIcon config
   *
   * 图标配置
   */
  fontIcon?: FontIconOptions;

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
