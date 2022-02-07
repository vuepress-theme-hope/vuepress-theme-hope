import type { Page } from "@vuepress/core";
import type { FeedChannelOption, FeedGetter } from "./feed";

export interface FeedOptions {
  /**
   * Deploy hostname
   *
   * 部署的域名
   */
  hostname: string;

  /**
   * A large image/icon of the feed
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
  sorter?: (pageA: Page, pageB: Page) => number;

  /**
   * Filter pages to load to feed
   *
   * Feed过滤器
   */
  filter?: (page: Page) => boolean;

  /**
   * Feed generation controller
   *
   * @description The plugin is providing a resonable getter by default, if you want a full control, you can set this field
   *
   * Feed 生成控制器
   *
   * @description 插件已经在默认情况下提供了合理的获取器，如果你需要完全控制，你可以设置此项。
   */
  getter?: FeedGetter;
}
