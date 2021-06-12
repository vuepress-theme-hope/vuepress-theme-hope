import { BasePageFrontMatter } from "@mr-hope/vuepress-shared";
import { PageInfoType } from "./pageInfo";

export interface CommentPluginFrontmatter extends BasePageFrontMatter {
  /**
   * 是否启用评论
   *
   * Whether Enable Comment
   *
   * @default true
   */
  comment?: boolean;
  /**
   * @description Only available when using valine
   *
   * 是否启用访问量
   *
   * Whether enable pageviews
   *
   * @default true
   */
  pageviews?: boolean;
  /**
   * PageInfo items
   *
   * 页面信息项
   *
   * @default ["Author", "Visitor", "Time", "Category", "Tag", "ReadTime"]
   */
  pageInfo?: PageInfoType[] | false;
}
