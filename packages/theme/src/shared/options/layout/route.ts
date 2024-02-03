export interface RouteLocaleData {
  /**
   * Skip to main content
   */
  skipToContent: string;

  /**
   * 404 page title
   *
   * 404 页面的标题
   */
  notFoundTitle: string;

  /**
   * 404 page msgs
   *
   * 404 页面的提示信息
   */
  notFoundMsg: string[];
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
   * Screen reader only message in `<ExternalLinkIcon>`
   *
   * 在 `<ExternalLinkIcon>` 中的屏幕阅读器消息
   */
  openInNewWindow: string;
}
