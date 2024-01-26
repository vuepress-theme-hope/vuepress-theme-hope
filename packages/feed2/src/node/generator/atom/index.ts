import { isArray } from "vuepress-shared/node";
import { js2xml } from "xml-js";

import type {
  AtomAuthor,
  AtomCategory,
  AtomContent,
  AtomEntry,
} from "./typings.js";
import type { FeedStore } from "../../feedStore.js";
import type { FeedAuthor, FeedCategory } from "../../typings/index.js";
import { FEED_GENERATOR, encodeXML } from "../../utils/index.js";

const getAtomAuthor = (author: FeedAuthor): AtomAuthor => {
  const { name = "Unknown", email, url } = author;

  return {
    name,
    ...(email ? { email } : {}),
    ...(url ? { uri: url } : {}),
  };
};

const getAtomCategory = (category: FeedCategory): AtomCategory => {
  const { name, scheme = "" } = category;

  return {
    _attributes: {
      term: name,
      scheme,
    },
  };
};

/**
 * Returns an Atom 1.0 feed
 *
 * @see http://www.atomenabled.org/developers/syndication/
 */
export const getAtomFeed = (feedStore: FeedStore): string => {
  const { channel, links } = feedStore;

  const content: AtomContent = {
    _declaration: {
      _attributes: {
        version: "1.0",
        encoding: "utf-8",
      },
    },
    _instruction: {
      "xml-stylesheet": `type="text/xsl" href="${links.atomXsl}"`,
    },
    feed: {
      _attributes: {
        xmlns: "http://www.w3.org/2005/Atom",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ...(channel.language ? { "xml:lang": channel.language } : {}),
      },
      id: channel.link,
      title: channel.title,

      ...(channel.description ? { subtitle: channel.description } : {}),
      ...(channel.author
        ? {
            author: isArray(channel.author)
              ? channel.author.map((author) => getAtomAuthor(author))
              : [getAtomAuthor(channel.author)],
          }
        : {}),
      ...(channel.icon ? { icon: channel.icon } : {}),
      ...(channel.image ? { logo: channel.image } : {}),
      ...(channel.copyright ? { rights: channel.copyright } : {}),

      updated: channel.lastUpdated
        ? channel.lastUpdated.toISOString()
        : new Date().toISOString(),
      generator: FEED_GENERATOR,
      link: [{ _attributes: { rel: "self", href: links.atom } }],
    },
  };

  if (channel.link)
    content.feed.link.push({
      _attributes: { rel: "alternate", href: channel.link },
    });

  if (channel.hub)
    content.feed.link.push({
      _attributes: { rel: "hub", href: channel.hub },
    });

  if (channel.image) content.feed.logo = channel.image;

  if (channel.icon) content.feed.icon = channel.icon;

  if (channel.copyright) content.feed.rights = channel.copyright;

  content.feed.category = Array.from(feedStore.categories).map((category) => ({
    _attributes: { term: category },
  }));

  content.feed.contributor = Array.from(feedStore.contributors)
    .filter((contributor) => contributor.name)
    .map((contributor) => getAtomAuthor(contributor));

  /**
   * "entry" nodes
   */
  content.feed.entry = feedStore.items.map((item) => {
    // entry: required elements
    const entry: AtomEntry = {
      title: { _attributes: { type: "text" }, _text: item.title },
      id: item.guid || item.link,
      link: { _attributes: { href: item.link } },
      updated: item.lastUpdated.toISOString(),
    };

    // entry: recommended elements
    if (item.summary)
      entry.summary = {
        _attributes: { type: "html" },
        _cdata: item.summary,
      };
    else if (item.description)
      entry.summary = {
        _attributes: { type: "text" },
        _text: item.description,
      };

    if (item.content)
      entry.content = {
        _attributes: { type: "html" },
        _cdata: item.content,
      };

    // author(s)
    if (item.author)
      entry.author = item.author
        .filter((author) => author.name)
        .map((author) => getAtomAuthor(author));

    if (item.category)
      // category
      entry.category = item.category.map((category) =>
        getAtomCategory(category),
      );

    // contributor
    if (item.contributor)
      entry.contributor = item.contributor.map((contributor) =>
        getAtomAuthor(contributor),
      );

    // published
    if (item.pubDate) entry.published = item.pubDate.toISOString();

    // rights
    if (item.copyright) entry.rights = item.copyright;

    return entry;
  });

  return js2xml(encodeXML(content), {
    compact: true,
    ignoreComment: true,
    spaces: 2,
  });
};
