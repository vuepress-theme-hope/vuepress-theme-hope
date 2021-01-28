/* eslint-disable @typescript-eslint/naming-convention */
import type { Feed } from "../feed";
import type { FeedAuthor } from "../../types";
import type { JSONAuthor, JSONContent, JSONItem } from "./typings";

const formatAuthor = (author: FeedAuthor): JSONAuthor => ({
  name: author.name as string,
  ...(author.url ? { url: author.url } : {}),
  ...(author.avator ? { avator: author.avator } : {}),
});

/**
 * JSON 1.1 feed
 *
 * @see https://jsonfeed.org/version/1.1
 */
export const renderJSON = (feed: Feed): string => {
  const { channel, links } = feed.options;

  const content: JSONContent = {
    version: "https://jsonfeed.org/version/1.1",
    title: channel.title,
    home_page_url: channel.link,
    feed_url: links.json,
  };

  if (channel.description) content.description = channel.description;

  if (channel.image) content.icon = channel.image;
  if (channel.icon) content.favicon = channel.icon;

  if (channel.author && channel.author.name) {
    content.author = {
      name: channel.author.name,
      ...(channel.author.url ? { url: channel.author.url } : {}),
      ...(channel.author.avator ? { avator: channel.author.avator } : {}),
    };
  }

  content.items = feed.items.map((item) => {
    const feedItem: JSONItem = {
      title: item.title,
      url: item.link,
      id: item.guid || item.link,
      ...(item.description ? { summary: item.description } : {}),

      // json_feed distinguishes between html and text content
      // but since we only take a single type, we'll assume HTML
      content_html: item.content,
    };

    if (item.image) feedItem.image = item.image;

    if (item.pubDate) feedItem.date_published = item.pubDate.toISOString();

    if (item.lastUpdated)
      feedItem.date_modified = item.lastUpdated.toISOString();

    // author
    if (Array.isArray(item.author)) {
      feedItem.authors = [];
      item.author.forEach((author) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (author.name) feedItem.authors!.push(formatAuthor(author));
      });
    } else if (typeof item.author === "object")
      feedItem.authors = [formatAuthor(item.author)];

    if (Array.isArray(item.category)) {
      feedItem.tags = [];

      item.category.forEach((category) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (category.name) feedItem.tags!.push(category.name);
      });
    }

    return feedItem;
  });

  return JSON.stringify(content, null, 2);
};
