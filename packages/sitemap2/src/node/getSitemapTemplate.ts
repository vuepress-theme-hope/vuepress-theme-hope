import { fs } from "vuepress/utils";
import { removeLeadingSlash } from "vuepress-shared/node";

import type { SitemapOptions } from "./options.js";
import { DEFAULT_TEMPLATE_PATH } from "./utils.js";

export const getSiteMapTemplate = (
  options: SitemapOptions,
): [path: string, content: string] => [
  options.sitemapXSLFilename
    ? removeLeadingSlash(options.sitemapXSLFilename)
    : "sitemap.xsl",
  options.sitemapXSLTemplate ?? fs.readFileSync(DEFAULT_TEMPLATE_PATH, "utf-8"),
];
