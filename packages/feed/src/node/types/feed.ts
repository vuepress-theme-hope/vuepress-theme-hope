export interface FeedAuthor {
  name?: string;
  email?: string;
  /**
   * @description json format only
   */
  url?: string;
  /**
   * @description json format only
   */
  avator?: string;
}

export interface FeedCategory {
  name: string;
  /**
   * @description rss format only
   */
  domain?: string;
  /**
   * @description atom format only
   *
   * the categorization scheme via a URI
   */
  scheme?: string;
}

export interface FeedEnclosure {
  url: string;
  type: string;
  length?: number;
  title?: string;
  duration?: number;
}

export interface FeedChannelOption {
  /**
   * 频道的标题
   *
   * Channel title
   */
  title: string;

  /**
   * 频道地址
   *
   * The URL to the HTML website corresponding to the channel.
   */
  link: string;

  /**
   * 频道描述信息
   *
   * Phrase or sentence describing the channel.
   */
  description: string;

  /**
   * 频道使用的语言
   *
   * The language the channel is written in.
   */
  language: string;

  /**
   * 频道版权信息
   *
   * Copyright notice for content in the channel.
   */
  copyright: string;

  /**
   * 频道内容的发布时间
   *
   * The publication date for the content in the channel.
   */
  pubDate?: Date;

  /**
   * 频道内容的上次更新时间
   *
   * The last time the content of the channel changed.
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

export interface FeedItemOption {
  /**
   * The title of the item.
   */
  title: string;

  /**
   * The URL of the item.
   */
  link: string;

  /**
   * The item synopsis.
   */
  description?: string;

  /**
   * A string that uniquely identifies the item.
   */
  guid?: string;

  /**
   * Email address of the author of the item.
   */
  author?: FeedAuthor[] | FeedAuthor;

  /**
   * Includes the item in one or more categories.
   */
  category?: FeedCategory[] | FeedCategory;

  /**
   * Indicates when the item was published.
   */

  pubDate?: Date;

  /**
   * Indicates when the item was updated.
   */
  lastUpdated: Date;

  /**
   * Item content
   */
  content?: string;

  /**
   * URL of a page for comments relating to the item.
   *
   * @description rss format only
   */
  comments?: string;

  /**
   * Describes a media object that is attached to the item.
   *
   * @description rss format only
   */
  enclosure?: FeedEnclosure;

  /**
   * @description json format only
   */
  image?: string;

  /**
   * @description atom format only
   */
  contributor?: FeedAuthor[];

  /**
   * @description atom format only
   */
  copyright?: string;
}

export interface FeedLinks {
  atom: string;
  json: string;
  rss: string;
}

export interface FeedInitOptions {
  channel: FeedChannelOption;
  links: FeedLinks;
}
