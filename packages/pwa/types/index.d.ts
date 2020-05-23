import "./declare";

/** PWA 配置 */
export interface PWAOptions {
  /** 自定义的弹窗组件 */
  popupComponent: string;
  /** workbox-build 的选项配置 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateSWConfig?: any;
}

/** 声明全局变量 */
declare global {
  const SW_BASE_URL: string;
}
