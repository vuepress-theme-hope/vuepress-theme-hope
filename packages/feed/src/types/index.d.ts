import type { FeedAuthor, FeedCategory, FeedChannelOption } from "./feed";
import type { Page } from "@mr-hope/vuepress-types";

export type * from "./feed";

export type FeedContributor = FeedAuthor;

export interface FeedOutput {
  atom?: {
    /**
     * 是否启用
     *
     * @default true
     */
    enable?: boolean;
    /**
     * 输出的路径
     *
     * Output path
     *
     * @default 'atom.xml'
     */
    path?: string;
  };
  json?: {
    /**
     * 是否启用
     *
     * @default true
     */
    enable?: boolean;
    /**
     * 输出的路径
     *
     * Output path
     *
     * @default 'feed.json'
     */
    path?: string;
  };
  rss?: {
    /**
     * 是否启用
     *
     * @default true
     */
    enable?: boolean;
    /**
     * 输出的路径
     *
     * Output path
     *
     * @default 'rss.xml'
     */
    path?: string;
  };
}

export interface FeedOptions {
  /**
   * 根目录语言
   */
  rootLang: string;
  /**
   * 部署的域名
   *
   * Deploy address
   */
  hostname: string;
  /**
   * 一个大的图片，用作 feed 展示
   *
   * A large iamge/icon of the feed
   */
  image?: string;

  /**
   * 一个小的图标，显示在订阅列表中
   *
   * A small icon of the feed，probably the favicon
   */
  icon?: string;

  /**
   * 输出的最大条目数量
   *
   * Max items to be output
   */
  count?: number;

  /**
   * Feed Chaneel 选项
   *
   * options to init feed channel
   */
  channel?: Partial<FeedChannelOption>;

  /**
   * 输出配置
   *
   * OutputConfig
   */
  output?: FeedOutput;

  /**
   * Sort pages
   */
  sort?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageA: Page & Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageB: Page & Record<string, any>
  ) => number;

  /**
   * Filter pages to load to feed
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: (page: Page & Record<string, any>) => boolean;
}

export interface FeedFrontmatterOption {
  /**
   * @default true
   */
  enable?: boolean;
  title?: string;
  description?: string;
  content?: string;
  author?: FeedAuthor[] | FeedAuthor;
  contributor?: FeedContributor[] | FeedContributor;
  category?: FeedCategory[] | FeedCategory;
  guid?: string;
}
