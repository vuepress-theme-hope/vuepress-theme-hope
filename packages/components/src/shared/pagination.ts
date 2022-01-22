import type { ConvertLocaleConfig } from "@mr-hope/vuepress-shared";

export interface PaginationLocaleData {
  /**
   * Previous page button label text
   *
   * 上一页文字
   */
  prev: string;

  /**
   * Next page button label text
   *
   * 下一页文字
   */
  next: string;

  /**
   * Navigation hint label text
   *
   * 跳转提示文字
   */
  navigate: string;

  /**
   * Navigation button label text
   *
   * 跳转按钮文字
   */
  button: string;

  /**
   * Error text when invalid page number, `$page` will be replaced by total page number automatically
   *
   * 页码错误文字，其中 `$page` 会自动替换为当前的总页数
   */
  errorText: string;
}

export type PaginationLocaleConfig = ConvertLocaleConfig<PaginationLocaleData>;
