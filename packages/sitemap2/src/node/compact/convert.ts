import { deprecatedLogger } from "./utils.js";
import type { SitemapOptions } from "../options.js";

/** @deprecated */
export const convertOptions = (
  options: SitemapOptions & Record<string, unknown>,
): void => {
  deprecatedLogger({
    options,
    deprecatedOption: "urls",
    newOption: "extraUrls",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "exclude",
    newOption: "excludeUrls",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "outFile",
    newOption: "sitemapFilename",
  });
  deprecatedLogger({
    options,
    deprecatedOption: "dateFormatter",
    newOption: "modifyTimeGetter",
  });
};
