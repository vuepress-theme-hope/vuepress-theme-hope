import type {
  FeedAuthor,
  FeedCategory,
  FeedChannelOption,
  FeedEnclosure,
} from "./feed";

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
  author?: FeedAuthor[];

  /**
   * Includes the item in one or more categories.
   */
  category?: FeedCategory[];

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
  content: string;

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
