import type { ArticleInfo } from "@mr-hope/vuepress-plugin-components";
import type { HopeThemePageFrontmatter } from "./base";
import type { AutoLink } from "../navbar";

export interface HopeThemeNormalPageFrontmatter
  extends HopeThemePageFrontmatter {
  /**
   * Whether is homepage
   *
   * 是否是主页
   */
  home?: false;

  /**
   * Page Heading depth
   *
   * 页面标题深度
   */
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

  /**
   * Whether show Edit link
   *
   * 是否显示编辑此页链接
   */
  editLink?: boolean;

  /**
   * Previous page link
   *
   * 上一页链接
   */
  prev?: string | AutoLink;

  /**
   * Next page link
   *
   * 下一页链接
   */
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
   * Whether enable breadcrumb
   *
   * 是否启用路径导航
   */
  breadcrumb?: boolean;

  /**
   *
   * Whether enable pageviews
   *
   * @description Only available when using waline comment service
   *
   * 是否启用访问量
   *
   * @description 仅在使用 Waline 评论服务时有效
   *
   * @default true
   */
  visitor?: boolean;

  /**
   * Whether display socialMedia
   *
   * 是否展示社交媒体
   */
  socialMedia?: false;

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
