import { resolveUrl } from "./utils";
import { getOutput } from "./options";

import type { App, HeadConfig } from "@vuepress/core";
import type { FeedOptions } from "./types";

export const injectLinkstoHead = (options: FeedOptions, app: App): void => {
  const output = getOutput(options.output);
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
  if (output.atom.enable)
    siteData.head.push(
      getHeadItem("Atom", output.atom.path, "application/atom+xml")
    );

  // add json link
  if (output.json.enable)
    siteData.head.push(
      getHeadItem("JSON", output.json.path, "application/json")
    );

  // add rss link
  if (output.rss.enable)
    siteData.head.push(
      getHeadItem("RSS", output.rss.path, "application/rss+xml")
    );
};
