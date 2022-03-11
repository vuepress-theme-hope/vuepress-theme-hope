interface RSSText {
  _text: string;
}

interface RSSCDATA {
  _cdata: string;
}

export interface RSSCategory extends RSSText {
  _attributes?: {
    /**
     * a string that identifies a categorization taxonomy
     */
    domain: string;
  };
}

export interface RSSEnclosure {
  _attributes: {
    /**
     * where the enclosure is located
     */
    url: string;
    /**
     * how big it is in bytes
     */
    length?: number;
    /**
     * what its type is (a standard MIME type)
     */
    type?: string;
  };
}

export interface RSSGuid extends RSSText {
  _attributes?: {
    isPermaLink: boolean;
  };
}

interface RSSSource extends RSSText {
  _attributes: {
    url: string;
  };
}

export interface RSSItem {
  /**
   * The title of the item.
   */
  title: RSSText;

  /**
   * The URL of the item.
   */
  link: RSSText;

  /**
   * The item synopsis.
   */
  description?: RSSText;

  /**
   * Email address of the author of the item
   */
  author?: RSSText;

  /**
   * Includes the item in one or more categories.
   */
  category?: RSSCategory[];

  /**
   * URL of a page for comments relating to the item.
   */
  comments?: RSSText;

  /**
   * Describes a media object that is attached to the item.
   */
  enclosure?: RSSEnclosure;

  /**
   * A string that uniquely identifies the item.
   */
  guid: RSSGuid;

  /**
   * Indicates when the item was published.
   */
  pubDate?: RSSText;

  /**
   * The RSS channel that the item came from.
   */
  source: RSSSource;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  "content:encoded"?: RSSCDATA;
}

export interface RSSContent {
  _declaration: {
    _attributes: {
      version: string;
      encoding: string;
    };
  };
  rss: {
    _attributes: {
      version: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "xmlns:atom"?: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "xmlns:content"?: string;
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "xmlns:dc"?: string;
    };
    channel: {
      /**
       * atom link
       */
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "atom:link": {
        _attributes: {
          href: string;
          rel: string;
          type: string;
        };
      };

      /**
       * Channel title
       */
      title: RSSText;

      /**
       * The URL to the HTML website corresponding to the channel.
       */
      link: RSSText;

      /**
       * Phrase or sentence describing the channel.
       */
      description: RSSText;

      /**
       * The language the channel is written in.
       */
      language?: RSSText;

      /**
       * Copyright notice for content in the channel.
       */
      copyright?: RSSText;

      /**
       * The publication date for the content in the channel.
       */
      pubDate?: RSSText;

      /**
       * The last time the content of the channel changed.
       */

      lastBuildDate: RSSText;

      /**
       * Specify one or more categories that the channel belongs to
       */
      category?: RSSText[];

      /**
       * A string indicating the program used to generate the channel.
       */
      generator: RSSText;

      /**
       *  URL that points to the documentation for the format used in the RSS file.
       */
      docs: RSSText;

      /**
       * time to live.
       *
       * It’s a number of minutes that indicates how long a channel can be cached before refreshing from the source.
       */
      ttl?: RSSText;

      /**
       * Specifies a GIF, JPEG or PNG image that can be displayed with the channel.
       */
      image?: {
        title: Partial<RSSText>;
        url: Partial<RSSText>;
        link: Partial<RSSText>;
      };

      item?: RSSItem[];
    };
  };
}
