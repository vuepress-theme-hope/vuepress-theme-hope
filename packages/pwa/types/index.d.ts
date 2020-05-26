import "./declare";

/** PWA 配置 */
export interface PWAOptions {
  /**
   * 用于替换默认弹出组件的自定义组件。
   *
   * A custom component to replace the default popup component.
   */
  popupComponent: string;
  /**
   * workbox-build's [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSWConfig?: any;
}

declare global {
  const SW_BASE_URL: string;
}
