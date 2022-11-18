import type { Page } from "@vuepress/core";

export interface FeedAuthor {
  /**
   * Author name
   *
   * 作者名字
   */
  name?: string;

  /**
   * Author Email
   *
   * 作者邮件
   */
  email?: string;

  /**
   * Author site
   *
   * 作者网站
   *
   * @description json format only
   */
  url?: string;

  /**
   * Author avatar
   *
   * 作者头像
   *
   * @description json format only
   */
  avatar?: string;
}

export type FeedContributor = FeedAuthor;

export interface FeedCategory {
  /**
   * Category name
   *
   * 分类名称
   */
  name: string;

  /**
   * A string that identifies a categorization taxonomy
   *
   * 标识分类法的字符串
   *
   * @description rss format only
   */
  domain?: string;

  /**
   * the categorization scheme via a URI
   *
   * URI 标识的分类 scheme
   *
   * @description atom format only
   */
  scheme?: string;
}

export interface FeedEnclosure {
  /**
   * enclosure link
   *
   * Enclosure 地址
   */
  url: string;

  /**
   * what its type is
   *
   * @description should be standard MIME type
   *
   * 类型
   *
   * @description 应为一个标准的 MIME 类型
   */
  type: string;

  /**
   * Size in bytes
   *
   * 按照字节数计算的大小
   */
  length?: number;
}

export interface FeedChannelOption {
  /**
   * Channel title
   *
   * 频道的标题
   */
  title: string;

  /**
   * The URL to the HTML site corresponding to the channel.
   *
   * 频道地址
   */
  link: string;

  /**
   * Phrase or sentence describing the channel.
   *
   * 频道描述信息
   */
  description: string;

  /**
   * The language the channel is written in.
   *
   * 频道使用的语言
   */
  language: string;

  /**
   * Copyright notice for content in the channel.
   *
   * 频道版权信息
   */
  copyright: string;

  /**
   * The publication date for the content in the channel.
   *
   * 频道内容的发布时间
   */
  pubDate?: Date;

  /**
   * The last time the content of the channel changed.
   *
   * 频道内容的上次更新时间
   */
  lastUpdated?: Date;

  /**
   * time to live.
   *
   * It’s a number of minutes that indicates how long a channel can be cached before refreshing from the source.
   */
  ttl?: number;

  /**
   * Specifies a GIF, JPEG or PNG image that can be displayed with the channel.
   */
  image?: string;

  /**
   * icon of the channel
   *
   * Probably your favicon
   */
  icon?: string;

  /**
   * GLobal Author
   */
  author?: FeedAuthor;

  /**
   * Link for websub
   *
   * @see https://w3c.github.io/websub/#subscription-migration
   */
  hub?: string;
}

export interface FeedGetter {
  /**
   * Item title getter
   *
   * 项目标题获取器
   */
  title?: <
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
  ) => string;

  /**
   * Item link getter
   *
   * 项目链接获取器
   */
  link?: <
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
  ) => string;

  /**
   * Item description getter
   *
   * 项目描述获取器
   */
  description?: <
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
  ) => string | null;

  /**
   * Item content getter
   *
   * 项目内容获取器
   */
  content?: <
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
  ) => string;

  /**
   * Item author getter
   *
   * @description The getter should return an empty array when lacking author info
   *
   * 项目作者获取器
   *
   * @description 获取器应在作者信息缺失时返回空数组
   */
  author?: <
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
  ) => FeedAuthor[];

  /**
   * Item category getter
   *
   * 项目分类获取器
   */
  category?: <
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
  ) => FeedCategory[] | null;

  /**
   * Item enclosure getter
   *
   * 项目附件获取器
   */
  enclosure?: <
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
  ) => FeedEnclosure | null;

  /**
   * Item publish date getter
   *
   * 项目发布日期获取器
   */
  publishDate?: <
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
  ) => Date | null;

  /**
   * Item last update date getter
   *
   * 项目最后更新日期获取器
   */
  lastUpdateDate?: <
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
  ) => Date;

  /**
   * Item image getter
   *
   * 项目图片获取器
   */
  image?: <
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
  ) => string;

  /**
   * Item contributor getter
   *
   * 项目贡献者获取器
   */
  contributor?: <
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
  ) => FeedContributor[];

  /**
   * Item copyright getter
   *
   * 项目版权获取器
   */
  copyright?: <
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
  ) => string | null;
}
