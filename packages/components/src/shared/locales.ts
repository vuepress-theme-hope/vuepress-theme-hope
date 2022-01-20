import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface ComponentLocaleData {
  /**
   * 返回顶部文字
   *
   * Back to top button label text
   */
  backToTop: string;

  /**
   * 在新窗口中打开
   *
   * Open in new window text
   */
  openInNewWindow: string;

  /**
   * 分页多语言配置
   *
   * Locale config for Pagination
   */
  pagination: {
    /**
     * 上一页文字
     *
     * Previous page button label text
     */
    prev: string;

    /**
     * 下一页文字
     *
     * Next page button label text
     */
    next: string;

    /**
     * 跳转提示文字
     *
     * Navigation hint label text
     */
    navigate: string;

    /**
     * 跳转按钮文字
     *
     * Navigation button label text
     */
    button: string;

    /**
     * 页码错误文字，其中 `$page` 会自动替换为当前的总页数
     *
     * Error text when invalid page number, `$page` will be replaced by total page number automatically
     */
    errorText: string;
  };
}

export type ComponentLocaleConfig = ConvertLocaleConfig<ComponentLocaleData>;
