/* eslint-disable @typescript-eslint/naming-convention */

export interface JSONAuthor {
  name: string;
  /**
   * the URL of a site owned by the author.
   */
  url?: string;
  avatar?: string;
}

export interface JSONItem {
  /**
   * unique for that item for that feed over time.
   */
  id: string;
  /**
   * the URL of the resource described by the item.
   */
  url: string;
  title: string;
  /**
   * This is the HTML or plain text of the item
   */
  content_html?: string;
  /**
   * a plain text sentence or two describing the item.
   */
  summary?: string;
  /**
   * the URL of the main image for the item.
   */
  image?: string;
  /**
   * publish date
   */
  date_published?: string;
  /**
   * last updated at
   */
  date_modified?: string;
  /**
   * authors
   */
  authors?: JSONAuthor[];
  /**
   * categories
   */
  tags?: string[];
}

export interface JSONContent {
  /**
   * The URL of the version of the format the feed uses.
   */
  version: "https://jsonfeed.org/version/1.1";
  /**
   * Name of the feed
   */
  title: string;
  /**
   * The URL of the resource that the feed describes
   */
  home_page_url: string;
  /**
   * the URL of the feed
   */
  feed_url?: string;
  /**
   * provides more detail, beyond the title, on what the feed is about.
   */
  description?: string;
  /**
   * the URL of an image for the feed suitable to be used in a timeline
   */
  icon?: string;
  /**
   * the URL of an image for the feed suitable to be used in a source list.
   */
  favicon?: string;
  /**
   * specifies one or more feed authors
   */
  author?: JSONAuthor;
  items?: JSONItem[];
}
