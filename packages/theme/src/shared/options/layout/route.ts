export interface HopeThemeRouteLocaleData {
  /**
   * 404 page msgs
   *
   * 404 页面的提示信息
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "404msg": string[];
  /**
   * Back to homepage
   *
   * 返回主页
   */
  home: string;
  /**
   * Back to last page
   *
   * 返回上一页
   */
  back: string;

  /**
   * screen reader only message in `<ExternalLinkIcon>`
   *
   * 在 `<ExternalLinkIcon>` 中的屏幕阅读器消息
   */
  openInNewWindow: string;
}
