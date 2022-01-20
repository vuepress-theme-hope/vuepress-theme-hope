import type { LocaleConfig } from "@vuepress/core";
import type { GenerateSWOptions } from "workbox-build";
import type { PWALocaleData } from "./locales";
import type { ManifestOption } from "./manifest";

interface ApplePWAOptions {
  /**
   * Path of icon used on apple devices
   *
   * Recommand 152×152 size
   *
   * 苹果上使用的图标路径
   *
   * 推荐 152×152 大小
   */
  icon?: string;

  /**
   * Color of status bar
   *
   * 状态栏的颜色
   *
   * @default 'black'
   */
  statusBarColor?: "black" | "white";

  /**
   * Safari mask icon
   *
   * Safari 图标
   */
  maskIcon?: string;
}

interface MicrosoftPWAOptions {
  /**
   * Microsoft tile image
   *
   * 144×144 transperent recommanded
   *
   * 微软磁贴图片
   *
   * 推荐 144×144，透明
   */
  image?: string;

  /**
   * tile color
   *
   * 磁贴颜色
   */
  color?: string;
}

/** PWA 配置 */
export interface PWAOptions {
  /**
   * Service Worker file path
   *
   * Service Worker 文件路径
   *
   * @default 'service-worker.js'
   */
  swPath?: string;

  /**
   * Whether display install button
   *
   * 是否显示安装按钮
   *
   * @default true
   */
  showInstall?: boolean;

  /**
   * manifest file Config
   *
   * manifest 文件设置
   */
  manifest?: ManifestOption;

  /**
   * Path of favico
   *
   * favico 地址
   */
  favicon?: string;

  /**
   * Theme Color
   *
   * 主题色
   *
   * @default "#46bd87"
   */
  themeColor?: string;

  /**
   * Max size which allows to cache, with KB unit
   *
   * 允许缓存的最大大小，单位 KB
   *
   * @default 2048
   */
  maxSize?: number;

  /**
   * Whether cache html files besides home page and 404
   *
   * 是否缓存除主页与 404 之外的 HTML
   *
   * @default true
   */
  cacheHTML?: boolean;

  /**
   * Whether cache pictures
   *
   * 是否缓存站点图片
   *
   * @default false
   */
  cachePic?: boolean;

  /**
   * Max size which allows to cache, with KB unit
   *
   * 图片允许缓存的最大大小，单位 KB
   *
   * @default 1024
   */
  maxPicSize?: number;

  /**
   * settings for apple
   *
   * 苹果设置
   */
  apple?: ApplePWAOptions | false;

  /**
   * Settings for Microsoft
   *
   * 微软设置
   */
  msTile?: MicrosoftPWAOptions | false;

  /**
   * A custom component to replace the default popup component.
   *
   * 用于替换默认弹出组件的自定义组件。
   *
   * @default 'SWUpdatePopup'
   */
  popupComponent?: string;

  /**
   * workbox-build’s [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)
   *
   */
  generateSWConfig?: GenerateSWOptions;

  /**
   * Locales config
   *
   * 国际化配置
   */

  locales?: LocaleConfig<PWALocaleData>;
}
