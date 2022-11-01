import { encodeCDATA, encodeXML, isUrl, stripTags } from "vuepress-shared/node";
import { js2xml } from "xml-js";
import { FEED_GENERATOR } from "../utils.js";

import type {
  RSSCategory,
  RSSContent,
  RSSEnclosure,
  RSSGuid,
  RSSItem,
} from "./typings.js";
import type { Feed } from "../feed.js";
import type {
  FeedCategory,
  FeedEnclosure,
  FeedItemOption,
} from "../../shared/index.js";

const genCategory = (category: FeedCategory): RSSCategory => {
  const { name, domain } = category;

  return {
    _text: name,
    ...(domain ? { _attributes: { domain } } : {}),
  };
};

const genGuid = (item: FeedItemOption): RSSGuid => {
  const guid = item.guid || encodeXML(item.link);

  return {
    ...(isUrl(guid)
      ? {}
      : {
          _attributes: {
            isPermaLink: false,
          },
        }),
    _text: guid,
  };
};

const genEnclosure = (enclosure: FeedEnclosure): RSSEnclosure => ({
  _attributes: {
    url: enclosure.url,
    ...(enclosure.length ? { length: enclosure.length } : {}),
    ...(enclosure.type ? { type: enclosure.type } : {}),
  },
});

/**
 * Returns a RSS 2.0 feed
 *
 * @see https://validator.w3.org/feed/docs/rss2.html
 */
export const renderRSS = (feed: Feed): string => {
  const { links, channel } = feed.options;
  let hasContent = false;

  const content: RSSContent = {
    _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
    rss: {
      _attributes: {
        version: "2.0",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "xmlns:atom": "http://www.w3.org/2005/Atom",
      },
      channel: {
        /**
         * @see http://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html
         */
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "atom:link": {
          _attributes: {
            href: links.rss,
            rel: "self",
            type: "application/rss+xml",
          },
        },
        title: { _text: channel.title },
        link: { _text: encodeXML(channel.link) },
        description: { _text: channel.description },
        language: { _text: encodeXML(channel.language) },
        pubDate: {
          _text: channel.pubDate
            ? channel.pubDate.toUTCString()
            : new Date().toUTCString(),
        },
        lastBuildDate: {
          _text: channel.lastUpdated
            ? channel.lastUpdated.toUTCString()
            : new Date().toUTCString(),
        },
        generator: { _text: FEED_GENERATOR },
        docs: {
          _text: "https://validator.w3.org/feed/docs/rss2.html",
        },
      },
    },
  };

  if (channel.copyright)
    content.rss.channel.copyright = { _text: channel.copyright };

  if (channel.ttl) content.rss.channel.ttl = { _text: channel.ttl.toString() };

  if (channel.image)
    content.rss.channel.image = {
      title: { _text: channel.title },
      url: { _text: channel.image },
      link: { _text: encodeXML(channel.link) },
    };

  /**
   * Channel Categories
   *
   * @see https://validator.w3.org/feed/docs/rss2.html#comments
   */
  content.rss.channel.category = Array.from(feed.categories).map(
    (category) => ({ _text: category })
  );

  /**
   * Channel Categories
   *
   * @see https://validator.w3.org/feed/docs/rss2.html#hrelementsOfLtitemgt
   */
  content.rss.channel.item = feed.items.map((entry) => {
    const item: RSSItem = {
      title: { _text: encodeXML(entry.title) },
      link: { _text: encodeXML(entry.link) },
      guid: genGuid(entry),
      source: {
        _attributes: { url: links.rss },
        _text: entry.title,
      },
    };

    if (entry.description)
      item.description = {
        _text: entry.description.startsWith("html:")
          ? stripTags(entry.description.substring(5))
          : entry.description,
      };

    /**
     * Item Author
     */
    if (entry.author) {
      const author = entry.author.find((author) => author.email && author.name);

      if (author)
        item.author = {
          _text: `${author.email!} (${author.name!})`,
        };
    }

    /**
     * Item Category
     *
     * @see https://validator.w3.org/feed/docs/rss2.html#ltcategorygtSubelementOfLtitemgt
     */
    if (entry.category)
      item.category = entry.category
        .filter((category) => category.name)
        .map((category) => genCategory(category));

    if (entry.comments) item.comments = { _text: encodeXML(entry.link) };

    if (entry.pubDate) item.pubDate = { _text: entry.pubDate.toUTCString() };

    if (entry.content) {
      hasContent = true;
      item["content:encoded"] = { _cdata: encodeCDATA(entry.content) };
    }

    /**
     * Item Enclosure
     *
     * @see https://validator.w3.org/feed/docs/rss2.html#ltenclosuregtSubelementOfLtitemgt
     */
    if (entry.enclosure) item.enclosure = genEnclosure(entry.enclosure);

    return item;
  });

  if (hasContent) {
    content.rss._attributes["xmlns:content"] =
      "http://purl.org/rss/1.0/modules/content/";
    content.rss._attributes["xmlns:dc"] = "http://purl.org/dc/elements/1.1/";
  }

  return js2xml(content, {
    compact: true,
    ignoreComment: true,
    spaces: 2,
  });
};
