/* eslint-disable @typescript-eslint/naming-convention */
import {
  type App,
  type AppDir,
  type Page,
  type PageFrontmatter,
} from "@vuepress/core";
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
import { type SeoOptions } from "./options.js";
import {
  type SEOPluginFrontmatter,
  type SeoPluginPageData,
} from "./typings/index.js";
import { logger } from "./utils.js";

export const appendSEO = (app: App, options: SeoOptions): void => {
  app.pages.forEach(
    (page: Page<SeoPluginPageData, PageFrontmatter<SEOPluginFrontmatter>>) => {
      const head = page.frontmatter.head || [];

      const canonicalLink = getCanonicalLink(page, options);
      const alternateLinks = getAlternateLinks(page, options, app);

      appendCanonical(head, canonicalLink);
      appendAlternate(head, alternateLinks);

      if (page.frontmatter["seo"] !== false) {
        const defaultOGP = getOGP(page, options, app);
        const defaultJSONLD = getJSONLD(page, options, app);

        const ogpContent = options.ogp
          ? options.ogp(defaultOGP, page, app)
          : defaultOGP;

        const jsonLDContent = options.jsonLd
          ? options.jsonLd(defaultJSONLD, page, app)
          : defaultJSONLD;

        addOGP(head, ogpContent);
        appendJSONLD(head, jsonLDContent);

        if (options.customHead) options.customHead(head, page, app);
      }

      page.frontmatter.head = head;
    }
  );
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
