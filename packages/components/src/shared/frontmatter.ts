import type { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import type { PageInfo } from "./pageInfo";

export interface PageInfoFrontmatter extends BasePageFrontMatter {
  /**
   * PageInfo items
   *
   * 页面信息项
   *
   * @default ["Author", "Visitor", "Time", "Category", "Tag", "ReadTime"]
   */
  pageInfo?: PageInfo[] | false;

  /**
   * @description Only available when using valine
   *
   * 是否启用访问量
   *
   * Whether enable pageviews
   *
   * @default true
   */
  pageview?: boolean;
}
