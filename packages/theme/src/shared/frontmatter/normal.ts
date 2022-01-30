import type { ArticleInfo } from "@mr-hope/vuepress-plugin-components";
import type { HopeThemePageFrontmatter } from "./base";
import type { AutoLink } from "../navbar";
import type { SidebarConfig } from "../sidebar";

export interface HopeThemeNormalPageFrontmatter
  extends HopeThemePageFrontmatter {
  home?: false;
  sidebar?: "auto" | false | SidebarConfig;
  headingDepth?: number;
  /**
   * Whether display lastUpdated time
   *
   * 是否显示最后更新事件
   */

  lastUpdated?: boolean;
  /**
   * Whether display contributors
   *
   * 是否显示贡献者
   */
  contributors?: boolean;
  editLink?: boolean;
  prev?: string | AutoLink;
  next?: string | AutoLink;

  /**
   * PageInfo items
   *
   * 页面信息项
   *
   * @default ["Author", "Visitor", "Time", "Category", "Tag", "ReadTime"]
   */
  pageInfo?: ArticleInfo[] | false;

  /**
   * @description Only available when using valine
   *
   * 是否启用访问量
   *
   * Whether enable pageviews
   *
   * @default true
   */
  visitor?: boolean;

  /**
   * Whether the article be sticky in list
   *
   * If a number fill in, greater number will appear in front
   *
   * 是否置顶，如果填入数字，更大值会出现在前面
   */
  sticky?: boolean | number;

  /**
   * Whether the article be stared
   *
   * If a number fill in, greater number will appear in front
   *
   * 是否收藏，如果填入数字，更大值会出现在前面
   */
  star?: boolean | number;
}
