import type { HopeThemePageFrontmatter } from "./base";
import type { PageInfo } from "../info";
import type { AutoLink } from "../utils";

export interface HopeThemeNormalPageFrontmatter
  extends HopeThemePageFrontmatter {
  /**
   * Whether is homepage
   *
   * 是否是主页
   */
  home?: false;

  /**
   * Whether index current page
   *
   * 是否索引此页面
   *
   * @default true
   */
  index?: boolean;

  /**
   * Page order in sidebar
   *
   * 页面在侧边栏的顺序
   *
   * @default 0
   */
  order?: number | false;

  /**
   * Dir config
   *
   * @description Only available at README.md
   *
   * 目录配置
   *
   * @description 仅在 README.md 中可用
   */
  dir?: {
    /**
     * Dir title
     *
     * @default title of README.md
     *
     * 目录标题
     *
     * @default README.md 标题
     */
    text?: string;

    /**
     * Dir icon
     *
     * @default icon of README.md
     *
     * 目录图标
     *
     * @default README.md 图标
     */
    icon?: string;

    /**
     * Whether Dir is collapsable
     *
     * 目录是否可折叠
     *
     * @default true
     */

    collapsable?: boolean;

    /**
     * Whether Dir is clickable
     *
     * @description Will set group link to link of README.md
     *
     * 目录是否可点击
     *
     * @description 将会将目录分组的链接设置为 README.md 对应的链接
     *
     * @default false
     */

    link?: boolean;

    /**
     * Whether index current dir
     *
     * 是否索引此目录
     *
     * @default true
     */
    index?: boolean;

    /**
     * Dir order in sidebar
     *
     * 目录在侧边栏中的顺序
     *
     * @default 0
     */
    order?: number;
  };

  /**
   * A short title used in navbar, sidebar and breadcrumb
   *
   * 用于导航栏，侧边栏和路径导航的短标题
   */
  shortTitle?: string;

  /**
   * Page Heading depth
   *
   * 页面标题深度
   */
  headerDepth?: number;

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
  pageInfo?: PageInfo[] | false;

  /**
   * Whether enable breadcrumb
   *
   * 是否启用路径导航
   */
  breadcrumb?: boolean;

  /**
   * Whether enable breadcrumb icon
   *
   * 是否启用路径导航图标
   */
  breadcrumbIcon?: boolean;

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
  pageview?: boolean;

  /**
   * Whether this page is an article
   */
  article?: boolean;

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
