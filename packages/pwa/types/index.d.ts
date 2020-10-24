import { Langs } from "@mr-hope/vuepress-shared-utils";
import { HeadItem } from "@mr-hope/vuepress-types";
import WorkboxBuild from "workbox-build";
import { ManifestOption } from "./manifest";
import { PWAI18NConfig } from "@mr-hope/vuepress-shared-utils";
import "./declare";

export * from "./manifest";

interface ApplePWAOptions {
  /**
   * 苹果上使用的图标路径
   *
   * 推荐 152×152 大小
   *
   * path of icon used on apple
   *
   * Recommand 152×152 size
   */
  icon?: string;
  /**
   * 状态栏的颜色
   *
   * Color of status bar
   *
   * @default 'black'
   */
  statusBarColor?: "black" | "white";
  /**
   * Safari mask icon
   */
  maskIcon?: string;
}

interface MicrosoftPWAOptions {
  /**
   * 磁贴图片
   *
   * tile image
   *
   * 144×144 transperent recommanded
   */
  image?: string;
  /**
   * 磁贴颜色
   *
   * tile color
   */
  color?: string;
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
   * 是否显示安装按钮
   *
   * Whether display install button
   *
   * @default true
   */
  showInstall?: boolean;
  /**
   * manifest 文件设置
   *
   * manifest file Config
   */
  manifest?: ManifestOption;
  /**
   * 部署站点的基础路径
   *
   * The base URL the site will be deployed at
   *
   * @default '/'
   */
  base?: string;
  /**
   * favico 地址
   *
   * Path of favico
   */
  favicon?: string;
  /**
   * 主题色
   *
   * @default "#46bd87"
   */
  themeColor?: string;
  /**
   * 允许缓存的最大大小，单位 KB
   *
   * Max size which allows to cache, with KB unit
   *
   * @default 1024
   */
  maxSize?: number;
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
   * 图片允许缓存的最大大小，单位 KB
   *
   * Max size which allows to cache, with KB unit
   *
   * @default 512
   */
  picMaxSize?: number;
  /**
   * 苹果设置
   *
   * settings for apple
   */
  apple?: ApplePWAOptions | false;
  /**
   * 微软设置
   *
   * Settings for Microsoft
   */
  msTile?: MicrosoftPWAOptions | false;
  /**
   * 用于替换默认弹出组件的自定义组件。
   *
   * A custom component to replace the default popup component.
   *
   * @default 'SWUpdatePopup'
   */
  popupComponent?: string;
  /**
   * workbox-build's [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSWConfig?: Partial<WorkboxBuild.Options>;
}

export const head: (options: PWAOptions, head?: HeadItem[]) => HeadItem[];

declare global {
  const PWA_OPTION: PWAOptions;
  const PWA_I18N: Record<string, PWAI18NConfig>;
  const SW_BASE_URL: string;
}
