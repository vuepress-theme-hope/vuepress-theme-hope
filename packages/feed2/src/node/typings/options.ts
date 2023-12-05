import type { Page } from "@vuepress/core";

import type { FeedChannelOption, FeedGetter } from "./feed.js";
import type { FeedPluginFrontmatter } from "./frontmatter.js";

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
   * Custom tags or elements which need to be preserved
   *
   * 需要保留的的自定义组件或元素
   */
  preservedElements?: (string | RegExp)[] | ((tagName: string) => boolean);

  /**
   * A custom filter function, used to filter feed items.
   *
   * Feed 项目过滤器
   */
  filter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    page: Page<
      ExtraPageData,
      ExtraPageFrontmatter & FeedPluginFrontmatter,
      ExtraPageFields
    >,
  ) => boolean;

  /**
   * A custom sort function, used to sort feed items.
   *
   * Feed 项目排序器
   */
  sorter?: <
    ExtraPageData extends Record<string, unknown> = Record<never, never>,
    ExtraPageFrontmatter extends Record<string, unknown> = Record<
      string,
      unknown
    >,
    ExtraPageFields extends Record<string, unknown> = Record<never, never>,
  >(
    pageA: Page<
      ExtraPageData,
      ExtraPageFrontmatter & FeedPluginFrontmatter,
      ExtraPageFields
    >,
    pageB: Page<
      ExtraPageData,
      ExtraPageFrontmatter & FeedPluginFrontmatter,
      ExtraPageFields
    >,
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
   * @default "atom.xml"
   */
  atomOutputFilename?: string;

  /**
   * Atom xsl template file path
   *
   * Atom xsl 模板文件路径
   *
   * @default "vuepress-plugin-feed2/templates/atom.xsl"
   */
  atomXslTemplate?: string;

  /**
   * Atom xsl filename, relative to dest folder.
   *
   * Atom xsl 输出路径，相对于输出路径。
   *
   * @default "atom.xsl"
   */
  atomXslFilename?: string;

  /**
   * JSON syntax output filename, relative to dest folder.
   *
   * JSON 格式输出路径，相对于输出路径。
   *
   * @default "feed.json"
   */
  jsonOutputFilename?: string;

  /**
   * RSS syntax output filename, relative to dest folder.
   *
   * RSS 格式输出路径，相对于输出路径。
   *
   * @default "rss.xml"
   */
  rssOutputFilename?: string;

  /**
   * RSS xsl template file path
   *
   * RSS xsl 模板文件路径
   *
   * @default "vuepress-plugin-feed2/templates/rss.xsl"
   */
  rssXslTemplate?: string;

  /**
   * RSS xsl filename, relative to dest folder.
   *
   * RSS xsl 输出路径，相对于输出路径。
   *
   * @default "rss.xsl"
   */
  rssXslFilename?: string;

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
