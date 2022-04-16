import { logger } from "@vuepress/utils";

import type { App, Page } from "@vuepress/core";
import type { MarkdownEnhanceOptions } from "../shared";

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
  const {
    options: { base },
    pages,
  } = app;

  const markdownLinks = page.links.filter(({ raw }) => raw.endsWith(".md"));

  const brokenLinks = [
    ...markdownLinks
      // relative markdown links
      .filter(({ raw }) => !raw.startsWith("/"))
      .filter(({ absolute }) =>
        // check whether the page exists
        pages.every(
          ({ filePathRelative }) =>
            !filePathRelative || `/${filePathRelative}` !== absolute
        )
      ),
    ...markdownLinks
      // absolute markdown link starts with base
      .filter(({ raw }) => raw.startsWith(base))
      .filter(({ absolute }) =>
        // check whether the page exists
        pages.every(
          ({ filePathRelative }) =>
            !filePathRelative || `${base}${filePathRelative}` !== absolute
        )
      ),
  ].map(({ raw }) => raw);

  const nonStandardLinks = markdownLinks
    // absolute markdown links not under base
    .filter(({ raw }) => raw.startsWith(`/`) && !raw.startsWith(base))
    .map(({ raw }) => raw);

  if (brokenLinks.length)
    logger.warn(`Broken links found in ${path}: ${brokenLinks.join(", ")}`);

  if (nonStandardLinks.length)
    logger.warn(
      `Markdown links outside project found in ${path}: ${brokenLinks.join(
        ", "
      )}`
    );
};
