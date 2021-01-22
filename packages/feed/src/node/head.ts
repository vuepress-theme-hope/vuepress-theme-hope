import { cyan } from "chalk";
import { Context, HeadItem } from "@mr-hope/vuepress-types";
import { FeedOptions } from "../types";
import { success, resolveUrl } from "./utils";
import { getOutput, ResolvedFeedOutput } from "./options";

export const output = {
  rss2: {
    enable: true,
    fileName: "rss.xml",
    headLink: {
      enable: true,
      type: "application/rss+xml",
      title: "%%site_title%% RSS Feed",
    },
  },
  atom1: {
    enable: true,
    fileName: "feed.atom",
    headLink: {
      enable: true,
      type: "application/atom+xml",
      title: "%%site_title%% Atom Feed",
    },
  },
  json1: {
    enable: true,
    fileName: "feed.json",
    headLink: {
      enable: true,
      type: "application/json",
      title: "%%site_title%% JSON Feed",
    },
  },
};

export class Head {
  private output: ResolvedFeedOutput;

  constructor(private options: FeedOptions, private context: Context) {
    this.output = getOutput(options.output);
  }

  getHeadItem(name: string, fileName: string, type: string): HeadItem {
    const {
      base,
      siteConfig: { title = "" },
    } = this.context;

    return [
      "link",
      {
        rel: "alternate",
        type,
        href: resolveUrl(this.options.hostname, base, fileName),
        title: `${title} ${name} Feed`,
      },
    ];
  }

  addLinks(): void {
    const {
      output,
      context: { siteConfig },
    } = this;

    if (!siteConfig.head) siteConfig.head = [];

    // add atom link
    if (output.atom.enable)
      siteConfig.head.push(
        this.getHeadItem("Atom", output.atom.path, "application/atom+xml")
      );

    // add json link
    if (output.json.enable)
      siteConfig.head.push(
        this.getHeadItem("JSON", output.json.path, "application/json")
      );

    // add rss link
    if (output.rss.enable)
      siteConfig.head.push(
        this.getHeadItem("RSS", output.rss.path, "application/rss+xml")
      );
  }
}
