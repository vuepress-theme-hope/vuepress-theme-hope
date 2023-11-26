import { createConverter } from "vuepress-shared/node";

import type { SitemapOptions } from "./options.js";

/** @deprecated */
export const convertOptions = (
  options: SitemapOptions & Record<string, unknown>,
): void => {
  const { deprecatedLogger } = createConverter("sitemap");

  deprecatedLogger({
    options,
    old: "urls",
    new: "extraUrls",
  });
  deprecatedLogger({
    options,
    old: "exclude",
    new: "excludeUrls",
  });
  deprecatedLogger({
    options,
    old: "outFile",
    new: "sitemapFilename",
  });
  deprecatedLogger({
    options,
    old: "dateFormatter",
    new: "modifyTimeGetter",
  });
};
