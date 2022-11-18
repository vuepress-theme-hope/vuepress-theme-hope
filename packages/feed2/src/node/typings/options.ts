import type { Page } from "@vuepress/core";
import type { FeedChannelOption, FeedGetter } from "./feed.js";

export interface BaseFeedOptions {
  /**
   * Whether to output Atom syntax files.
   *
   * 是否启用 Atom 格式输出。
   *
   * @default false
   */
  atom?: boolean;

  /**
   * Whether to output JSON syntax files.
   *
   * 是否启用 JSON 格式输出。
   *
   * @default false
   */
  json?: boolean;

  /**
   * Whether to output RSS syntax files.
   *
   * 是否启用 RSS 格式输出。
   *
   * @default false
   */
  rss?: boolean;

  /**
   * A large image/icon of the feed, probably used as banner.
   *
   * 一个大的图片，用作 feed 展示。
   */
  image?: string;

  /**
   * A small icon of the feed, probably used as favicon.
   *
   * 一个小的图标，显示在订阅列表中。
   */
  icon?: string;

  /**
   * Maximum output items
   *
   * 输出的最大条目数量
   *
   * @default 100
   */
  count?: number;

  /**
   * Custom component or element which needs to be removed
   *
   * 需要移除的自定义组件或元素
   *
   * @default ['ExternalLinkIcon']
   */
  customElements?: string[];

  /**
   * A custom filter function, used to filter feed items.
   *
   * Feed 项目过滤器
   */
  filter?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => boolean;

  /**
   * A custom sort function, used to sort feed items.
   *
   * Feed 项目排序器
   */
  sorter?: <
    ExtraPageData extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >,
    ExtraPageFrontmatter extends Record<
      string | number | symbol,
      unknown
    > = Record<string, unknown>,
    ExtraPageFields extends Record<string | number | symbol, unknown> = Record<
      never,
      never
    >
  >(
    pageA: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>,
    pageB: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>
  ) => number;

  /**
   * Options to init feed channel
   *
   * Feed 频道选项
   */
  channel?: Partial<FeedChannelOption>;

  /**
   * Atom syntax output filename, relative to dest folder.
   *
   * Atom 格式输出路径，相对于输出路径。
   *
   * @default 'atom.xml'
   */
  atomOutputFilename?: string;

  /**
   * JSON syntax output filename, relative to dest folder.
   *
   * JSON 格式输出路径，相对于输出路径。
   *
   * @default 'feed.json'
   */
  jsonOutputFilename?: string;

  /**
   * RSS syntax output filename, relative to dest folder.
   *
   * RSS 格式输出路径，相对于输出路径。
   *
   * @default 'rss.xml'
   */
  rssOutputFilename?: string;

  /**
   * Feed generation controller
   *
   * @description The plugin is providing a reasonable getter by default, if you want full control of feed generating, you can set this field.
   *
   * Feed 生成控制器
   *
   * @description 插件已经在默认情况下提供了合理的获取器，如果你需要完全控制 Feed 生成，你可以设置此项。
   */
  getter?: FeedGetter;
}

export interface FeedOptions extends BaseFeedOptions {
  /**
   * Deploy hostname
   *
   * 部署的域名
   */
  hostname: string;

  /** Locales for feed */
  locales?: Record<string, BaseFeedOptions>;
}
