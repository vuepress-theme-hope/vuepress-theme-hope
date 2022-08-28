/* eslint-disable @typescript-eslint/naming-convention */
import { fs } from "@vuepress/utils";
import {
  getAlternateLinks,
  getCanonicalLink,
  getJSONLD,
  getOGP,
} from "./info.js";
import {
  addOGP,
  appendAlternate,
  appendCanonical,
  appendJSONLD,
} from "./inject.js";
import { logger } from "./utils.js";

import type { App, AppDir } from "@vuepress/core";
import type { ExtendPage, SeoOptions } from "../shared/index.js";

export const appendSEO = (
  page: ExtendPage,
  options: SeoOptions,
  app: App
): void => {
  const head = page.frontmatter.head || [];

  const defaultOGP = getOGP(page, options, app);
  const defaultJSONLD = getJSONLD(page, options, app);

  const ogpContent = options.ogp
    ? options.ogp(defaultOGP, page, app)
    : defaultOGP;

  const jsonLDContent = options.jsonLd
    ? options.jsonLd(defaultJSONLD, page, app)
    : null;

  const canonicalLink = getCanonicalLink(page, options);
  const alternateLinks = getAlternateLinks(page, app);

  addOGP(head, ogpContent);
  appendJSONLD(head, jsonLDContent);
  appendCanonical(head, canonicalLink);
  appendAlternate(head, alternateLinks);

  if (options.customHead) options.customHead(head, page, app);

  page.frontmatter.head = head;
};

export const generateRobotsTxt = async (dir: AppDir): Promise<void> => {
  logger.load("Generating robots.txt");
  const publicPath = dir.public("robots.txt");

  let content = fs.existsSync(publicPath)
    ? await fs.readFile(publicPath, { encoding: "utf8" })
    : "";

  if (content && !content.includes("User-agent")) {
    logger.error();
    logger.update("robots.txt seems invalid!");
  } else {
    content += "\nUser-agent:*\nDisallow:\n";

    await fs.writeFile(dir.dest("robots.txt"), content, {
      flag: "w",
    });

    logger.succeed();
  }
};
