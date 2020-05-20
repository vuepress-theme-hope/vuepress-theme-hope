import "./declare";

/** PWA 配置 */
export type PWAOptions = Partial<{
  /** 自定义的弹窗组件 */
  popupComponent: any;
  /** workbox-build 的选项配置 */
  generateSWConfig: any;
}>;

/** 声明全局变量 */
declare global {
  const SW_BASE_URL: string;
}
