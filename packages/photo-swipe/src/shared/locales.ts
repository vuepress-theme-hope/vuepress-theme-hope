import type { ResolvedLocaleConfig } from "@mr-hope/vuepress-shared";
import type PhotoSwipeDefaultUI from "photoswipe/dist/photoswipe-ui-default";

export interface PhowoSwipeI18nConfig {
  /** 关闭 */
  close: string;
  /** 全屏 */
  fullsreen: string;
  /** 分享 */
  share: string;
  /** 缩放 */
  zoom: string;
  /** 上一个 */
  prev: string;
  /** 下一个 */
  next: string;
  /** 按钮 */
  buttons: PhotoSwipeDefaultUI.ShareButtonData[];
}

export type PhowoSwipeLocaleConfig = ResolvedLocaleConfig<PhowoSwipeI18nConfig>;
