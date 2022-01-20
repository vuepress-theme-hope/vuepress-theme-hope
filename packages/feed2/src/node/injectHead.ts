import { resolveUrl } from "./utils";

import type { App, HeadConfig } from "@vuepress/core";
import type { FeedOptions } from "../shared";

export const injectLinkstoHead = (options: FeedOptions, app: App): void => {
  const { base } = app.options;
  const { siteData } = app;

  const getHeadItem = (
    name: string,
    fileName: string,
    type: string
  ): HeadConfig => {
    return [
      "link",
      {
        rel: "alternate",
        type,
        href: resolveUrl(options.hostname, base, fileName),
        title: `${siteData.title || ""} ${name} Feed`,
      },
    ];
  };

  if (!siteData.head) siteData.head = [];

  // add atom link
  if (options.atom)
    siteData.head.push(
      getHeadItem(
        "Atom",
        options.atomOutputFilename || "atom.xml",
        "application/atom+xml"
      )
    );

  // add json link
  if (options.json)
    siteData.head.push(
      getHeadItem(
        "JSON",
        options.jsonOutputFilename || "feed.json",
        "application/json"
      )
    );

  // add rss link
  if (options.rss)
    siteData.head.push(
      getHeadItem(
        "RSS",
        options.rssOutputFilename || "rss.xml",
        "application/rss+xml"
      )
    );
};
