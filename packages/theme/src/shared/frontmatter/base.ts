import type { PageFrontmatter } from "vuepress/shared";

import type { Author } from "../author.js";
import type { SidebarArrayOptions } from "../sidebar.js";

export interface ThemeBasePageFrontmatter extends PageFrontmatter {
  /**
   * Page icon
   *
   * 页面图标
   */
  icon?: string;

  /**
   * Page Author(s)
   *
   * 页面作者
   */
  author?: Author | false;

  /**
   * Writing Date
   *
   * 写作日期
   */
  date?: Date | string;

  /**
   * Page Category(ies)
   *
   * 页面分类
   */
  category?: string | string[];
  categories?: string[];

  /**
   * Page Tag(s)
   *
   * 页面标签
   */
  tag?: string[] | string;
  tags?: string[];

  /**
   * Whether the content is original
   *
   * 是否原创
   */
  isOriginal?: boolean;

  /**
   * Whether the page is an article
   *
   * 页面是否是文章
   */
  article?: boolean;

  /**
   * Page Cover
   *
   * 页面封面
   */
  cover?: string;

  /**
   * Page Banner
   *
   * 页面 Banner 图
   */
  banner?: string;

  /**
   * Footer text
   *
   * 页脚文字
   */
  footer?: string | boolean;

  /**
   * License text
   *
   * 协议文字
   */
  license?: string;

  /**
   * Copyright text
   *
   * 版权文字
   */
  copyright?: string | false;

  /**
   * Whether is home page
   *
   * 是否是主页
   *
   * @default false
   */

  home?: boolean;

  /**
   * Whether enable navbar
   *
   * 是否启用导航栏
   *
   * @default true
   */
  navbar?: boolean;

  /**
   * Sidebar configuration
   *
   * 侧边栏配置
   */
  sidebar?: false | SidebarArrayOptions;

  /**
   * Additional Class for Page container
   *
   * 页面容器的额外类名
   */
  containerClass?: string;

  /**
   * Whether show external link icon
   *
   * 是否启用外部链接图标
   *
   * @default true
   */
  externalLinkIcon?: boolean;
}
