import {
  isArray,
  isFunction,
  isLinkAbsolute,
  isRegExp,
} from "@vuepress/helper";
import type { App, Page } from "vuepress/core";
import { logger } from "vuepress/utils";

import type { MarkdownEnhanceOptions } from "./options.js";

export const defaultLinkCheck = (): boolean => false;

export const getLinksCheckStatus = (
  app: App,
  options: Partial<MarkdownEnhanceOptions> = {},
): {
  enabled: boolean;
  isIgnoreLink: (link: string) => boolean;
} => {
  const { status = "dev", ignore = [] } = options.checkLinks || {};

  return {
    enabled:
      // Always check
      status === "always" ||
      // Enable in dev
      (app.env.isDev && status === "dev") ||
      // Enabled in build
      (app.env.isBuild && status === "build") ||
      false,
    isIgnoreLink: isFunction(ignore)
      ? (link: string): boolean => ignore(link, app.env.isDev)
      : isArray(ignore)
        ? (link: string): boolean =>
            ignore.some((item) =>
              isRegExp(item) ? item.test(link) : item === link,
            )
        : defaultLinkCheck,
  };
};

export const linksCheck = (
  page: Page,
  app: App,
  isIgnoreLink: (link: string) => boolean,
): void => {
  const path = page.filePathRelative || page.path;
  const { pages } = app;

  const markdownLinks = page.links.filter(({ raw }) =>
    raw.match(/.md((?:\?|#).*)?$/),
  );

  const brokenLinks = [
    ...markdownLinks
      // Relative markdown links
      .filter(({ raw }) => !isLinkAbsolute(raw))
      .filter(
        ({ relative }) =>
          // Check whether the page exists
          pages.every(
            ({ filePathRelative }) => filePathRelative !== decodeURI(relative),
          ) && !isIgnoreLink(relative),
      ),
    ...markdownLinks
      // Absolute markdown links
      .filter(({ raw }) => isLinkAbsolute(raw))
      .filter(({ absolute }) =>
        // Check whether the page exists
        pages.every(
          ({ filePathRelative }) =>
            !filePathRelative ||
            (`${app.options.base}${filePathRelative}` !== decodeURI(absolute) &&
              !isIgnoreLink(absolute)),
        ),
      ),
  ].map(({ raw }) => raw);

  if (brokenLinks.length)
    logger.warn(`Broken links found in ${path}: ${brokenLinks.join(", ")}`);
};
