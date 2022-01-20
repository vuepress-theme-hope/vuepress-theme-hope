import type { Page } from "@vuepress/core";
import type { FeedChannelOption } from "./feed";

export interface FeedOptions {
  /**
   * Deploy hostname
   *
   * 部署的域名
   */
  hostname: string;
  /**
   * A large iamge/icon of the feed
   *
   * 一个大的图片，用作 feed 展示
   */
  image?: string;

  /**
   * A small icon of the feed，probably the favicon
   *
   * 一个小的图标，显示在订阅列表中
   */
  icon?: string;

  /**
   * Max items to be output
   *
   * 输出的最大条目数量
   */
  count?: number;

  /**
   * options to init feed channel
   *
   * Feed Chaneel 选项
   */
  channel?: Partial<FeedChannelOption>;
  /**
   * Whether output Atom syntax files
   *
   * 是否启用 Atom 格式输出
   *
   * @default true
   */
  atom?: boolean;

  /**
   * Atom syntax output filename, relative to dest folder
   *
   * Atom 格式输出路径，相对于输出路径
   *
   * @default 'atom.xml'
   */
  atomOutputFilename?: string;

  /**
   * Whether output JSON syntax files
   *
   * 是否启用 JSON 格式输出
   *
   * @default true
   */
  json?: boolean;

  /**
   * JSON syntax output filename, relative to dest folder
   *
   * JSON 格式输出路径，相对于输出路径
   *
   * @default 'feed.json'
   */
  jsonOutputFilename?: string;

  /**
   * Whether output RSS syntax files
   *
   * 是否启用 RSS 格式输出
   *
   * @default true
   */
  rss?: boolean;
  /**
   * RSS syntax output filename, relative to dest folder
   *
   * RSS 格式输出路径，相对于输出路径
   *
   * @default 'rss.xml'
   */
  rssOutputFilename?: string;

  /**
   * Feed sorter
   *
   * Feed 项目排序器
   */
  sorter?: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageA: Page & Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageB: Page & Record<string, any>
  ) => number;

  /**
   * Filter pages to load to feed
   *
   * Feed过滤器
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: (page: Page & Record<string, any>) => boolean;
}
