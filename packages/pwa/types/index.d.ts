/* eslint-disable @typescript-eslint/naming-convention */
import { Langs } from "@mr-hope/vuepress-shared-utils";
import WorkboxBuild from "workbox-build";
import "./declare";

export interface ManifestIcon {
  src: string;
  sizes: string;
  type?: string;
  purpose?: "any" | "maskable";
}

export interface ManifestRelatedApps {
  platform: string;
  url: string;
  id?: string;
}

export interface ManifestOption {
  name?: string;

  short_name?: string;
  description?: string;
  background_color?: string;
  dir?: "ltr" | "rtl" | "auto";
  lang?: string;
  display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  icons?: ManifestIcon[];
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "landscape-primary"
    | "landscape-secondary"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary";
  prefer_related_applications?: boolean;
  related_applications?: ManifestRelatedApps[];
  scope?: string;
  start_url?: string;
  theme_color?: string;
}

/** PWA 配置 */
export interface PWAOptions {
  /**
   * 主目录所对应的语言。
   *
   * The language of the home directory.
   *
   * @default 'en-US'
   */
  baseLang?: Langs;
  /**
   * 用于替换默认弹出组件的自定义组件。
   *
   * A custom component to replace the default popup component.
   *
   * @default 'SWUpdatePopup'
   */
  popupComponent?: string;
  /**
   * manifest Config
   */
  manifest?: ManifestOption;
  /**
   * 是否缓存除主页与 404 之外的 HTML
   *
   * Whether cache html files besides home page and 404
   *
   * @default true
   */
  cacheHTML?: boolean;
  /**
   * 是否缓存站点图片
   *
   * Whether cache pictures
   *
   * @default false
   */
  cachePic?: boolean;
  /**
   * 允许缓存的最大大小，单位 KB
   *
   * Max size which allows to cache, with KB unit
   *
   * @default 1024
   */
  cacheMaxSize?: number;
  /**
   * workbox-build's [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSWConfig?: Partial<WorkboxBuild.Options>;
}

declare global {
  const SW_BASE_URL: string;
  const PWA_I18N: Record<string, string>;
}
