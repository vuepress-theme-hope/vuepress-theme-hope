import { deprecatedLogger } from "./utils";
import type { SitemapOptions } from "../../shared";

/** @deprecated */
export const covertOptions = (
  options: SitemapOptions & Record<string, unknown>
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
