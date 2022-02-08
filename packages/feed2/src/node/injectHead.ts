import { getFilename, resolveUrl } from "./utils";

import type { App, HeadConfig } from "@vuepress/core";
import type { FeedOptions } from "../shared";

export const injectLinkstoHead = (app: App, options: FeedOptions): void => {
  const { base } = app.options;
  const { siteData } = app;
  const { atomOutputFilename, jsonOutputFilename, rssOutputFilename } =
    getFilename(options);

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
      getHeadItem("Atom", atomOutputFilename, "application/atom+xml")
    );

  // add json link
  if (options.json)
    siteData.head.push(
      getHeadItem("JSON", jsonOutputFilename, "application/json")
    );

  // add rss link
  if (options.rss)
    siteData.head.push(
      getHeadItem("RSS", rssOutputFilename, "application/rss+xml")
    );
};
