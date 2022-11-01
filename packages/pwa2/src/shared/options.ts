import type { LocaleConfig } from "@vuepress/core";
import type { GenerateSWOptions } from "workbox-build";
import type { PWALocaleData } from "./locales.js";
import type { ManifestOption } from "./manifest.js";

interface ApplePWAOptions {
  /**
   * Path of icon used on apple devices
   *
   * Recommend 152×152 size
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
   * 144×144 transparent recommended
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
   * Path of favicon
   *
   * favicon 地址
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
   * @default false
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
   * Update logic
   *
   * - `"disabled"`: Do nothing even when new service worker is available. After new service work succeeds installing and starts waiting, it will control page and provide new content in next visit.
   * - `"available"`: Only display update popup when the new service worker is available
   * - `"hint"`: Display a hint to let user choose to refresh immediately. This is helpful when you want users to see new docs immediately.
   * - `"force"`: unregister current service worker immediately then refresh to get new content. **This may affect visiting experiences**！
   *
   * 更新逻辑
   *
   * - `"disabled"`: 即使有新的 service worker 也不做任何事情，新的 service work 开始等待后，会在用户下次访问时接管页面，让用户获得新内容。
   * - `"available"`: 仅当新的 service worker 可用时才显示更新弹出窗口
   * - `"hint"`: 显示更新内容可用提示，并允许用户立即刷新。当新的 SW 成功注册后，将转为更新内容就绪弹窗。当你希望用户立即查看新文档时，这很有帮助。
   * - `"force"`: 立即注销当前 Service Worker 然后刷新以获取新内容。**这可能会影响访问体验**!
   *
   * @default "available"
   */
  update?: "available" | "hint" | "force" | "disable";

  /**
   * A custom component to replace the default hint popup component.
   *
   * 用于替换默认提示弹出组件的自定义组件。
   *
   * @default 'SWHintPopup'
   */
  hintComponent?: string;

  /**
   * A custom component to replace the default update popup component.
   *
   * 用于替换默认更新弹出组件的自定义组件。
   *
   * @default 'SWUpdatePopup'
   */
  updateComponent?: string;

  /**
   * workbox-build’s [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)
   *
   */
  generateSWConfig?: Partial<GenerateSWOptions>;

  /**
   * Locales config
   *
   * 国际化配置
   */

  locales?: LocaleConfig<PWALocaleData>;

  /**
   * Whether append base to all absolute links
   *
   * 是否为所有绝对链接添加 base
   *
   * @default false
   */
  appendBase?: boolean;
}
