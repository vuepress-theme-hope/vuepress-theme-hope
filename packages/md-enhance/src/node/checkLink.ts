import { type App, type Page } from "@vuepress/core";
import { logger } from "@vuepress/utils";
import { isAbsoluteUrl } from "vuepress-shared/node";

import { type MarkdownEnhanceOptions } from "./options.js";

export const getCheckLinksStatus = (
  app: App,
  options: Partial<MarkdownEnhanceOptions>
): boolean => {
  const { linkCheck = "dev" } = options;

  return typeof linkCheck === "boolean"
    ? linkCheck
    : // always check
      linkCheck === "always" ||
        // enable in dev
        (app.env.isDev && linkCheck === "dev") ||
        // enabled in build
        (app.env.isBuild && linkCheck === "build") ||
        false;
};

export const checkLinks = (page: Page, app: App): void => {
  const path = page.filePathRelative || page.path;
  const { pages } = app;

  const markdownLinks = page.links.filter(({ raw }) =>
    raw.match(/.md((?:\?|#).*)?$/)
  );

  const brokenLinks = [
    ...markdownLinks
      // relative markdown links
      .filter(({ raw }) => !isAbsoluteUrl(raw))
      .filter(({ relative }) =>
        // check whether the page exists
        pages.every(
          ({ filePathRelative }) => filePathRelative !== decodeURI(relative)
        )
      ),
    ...markdownLinks
      // absolute markdown links
      .filter(({ raw }) => isAbsoluteUrl(raw))
      .filter(({ absolute }) =>
        // check whether the page exists
        pages.every(
          ({ filePathRelative }) =>
            !filePathRelative ||
            `${app.options.base}${filePathRelative}` !== decodeURI(absolute)
        )
      ),
  ].map(({ raw }) => raw);

  if (brokenLinks.length)
    logger.warn(`Broken links found in ${path}: ${brokenLinks.join(", ")}`);
};
