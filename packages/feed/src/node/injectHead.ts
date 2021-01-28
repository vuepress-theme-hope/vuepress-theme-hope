import { resolveUrl } from "./utils";
import { getOutput } from "./options";

import type { Context, HeadItem } from "@mr-hope/vuepress-types";
import type { FeedOptions } from "../types";

export const injectLinkstoHead = (
  options: FeedOptions,
  context: Context
): void => {
  const output = getOutput(options.output);
  const { base, siteConfig } = context;

  const getHeadItem = (
    name: string,
    fileName: string,
    type: string
  ): HeadItem => {
    return [
      "link",
      {
        rel: "alternate",
        type,
        href: resolveUrl(options.hostname, base, fileName),
        title: `${siteConfig.title || ""} ${name} Feed`,
      },
    ];
  };

  if (!siteConfig.head) siteConfig.head = [];

  // add atom link
  if (output.atom.enable)
    siteConfig.head.push(
      getHeadItem("Atom", output.atom.path, "application/atom+xml")
    );

  // add json link
  if (output.json.enable)
    siteConfig.head.push(
      getHeadItem("JSON", output.json.path, "application/json")
    );

  // add rss link
  if (output.rss.enable)
    siteConfig.head.push(
      getHeadItem("RSS", output.rss.path, "application/rss+xml")
    );
};
