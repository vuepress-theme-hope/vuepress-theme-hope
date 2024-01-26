import { fs, getDirname, path } from "vuepress/utils";
import { ensureEndingSlash, entries } from "vuepress-shared/node";

import type { ResolvedFeedOptionsMap } from "./options.js";
import { getFilename } from "./options.js";

const __dirname = getDirname(import.meta.url);

const TEMPLATE_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../templates"),
);

export const DEFAULT_ATOM_XML_TEMPLATE = fs.readFileSync(
  `${TEMPLATE_FOLDER}atom.xsl`,
  "utf-8",
);

export const DEFAULT_RSS_XML_TEMPLATE = fs.readFileSync(
  `${TEMPLATE_FOLDER}rss.xsl`,
  "utf-8",
);

export const getAtomTemplates = (
  options: ResolvedFeedOptionsMap,
): [path: string, content: string][] =>
  entries(options)
    // filter enabled locales
    .filter(([, { atom }]) => atom)
    // write template
    .map(([localePath, localeOptions]) => {
      const { atomXslTemplate = DEFAULT_ATOM_XML_TEMPLATE } = localeOptions;
      const { atomXslFilename } = getFilename(localeOptions, localePath);

      return [atomXslFilename, atomXslTemplate];
    });

export const getRSSTemplates = (
  options: ResolvedFeedOptionsMap,
): [path: string, content: string][] =>
  entries(options)
    // filter enabled locales
    .filter(([, { rss }]) => rss)
    // write template
    .map(([localePath, localeOptions]) => {
      const { rssXslTemplate = DEFAULT_RSS_XML_TEMPLATE } = localeOptions;

      const { rssXslFilename } = getFilename(localeOptions, localePath);

      return [rssXslFilename, rssXslTemplate];
    });
