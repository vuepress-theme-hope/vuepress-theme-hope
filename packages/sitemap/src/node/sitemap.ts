import { black, blue, cyan } from "chalk";
import { createWriteStream, readFile, existsSync, writeFile } from "fs-extra";
import { relative, resolve } from "path";
import { SitemapStream } from "sitemap";

import type { Context, PageComputed, SiteData } from "@mr-hope/vuepress-types";
import type {
  SitemapFrontmatterOption,
  SitemapLinkOption,
  SitemapImageOption,
  SitemapVideoOption,
  SitemapOptions,
} from "../types";

interface SitemapOption {
  lastmod: string;
  changefreq?: string;
  priority?: number;
  img?: SitemapImageOption[];
  video?: SitemapVideoOption[];
  links?: SitemapLinkOption[];
}

const stripLocalePrefix = (
  path: string,
  localePathPrefixes: string[]
): {
  normalizedPath: string;
  localePrefix: string;
} => {
  const matchingPrefix = localePathPrefixes
    .filter((prefix) => path.startsWith(prefix))
    .shift() as string;

  return {
    normalizedPath: path.replace(matchingPrefix, "/"),
    localePrefix: matchingPrefix,
  };
};

const generatePageMap = (
  siteData: SiteData,
  base: string,
  options: SitemapOptions
): Map<string, SitemapOption> => {
  const {
    changefreq = "daily",
    exclude = [],
    dateFormatter = (page: PageComputed): string =>
      page.updateTimeStamp ? new Date(page.updateTimeStamp).toISOString() : "",
  } = options;

  const { pages, locales = {} } = siteData;

  // Sort the locale keys in reverse order so that longer locales, such as '/en/', match before the default '/'
  const localeKeys = Object.keys(locales).sort().reverse();
  const localesByNormalizedPagePath = pages.reduce((map, page) => {
    const { normalizedPath, localePrefix } = stripLocalePrefix(
      page.path,
      localeKeys
    );
    const prefixesByPath = map.get(normalizedPath) || [];
    prefixesByPath.push(localePrefix);

    return map.set(normalizedPath, prefixesByPath);
  }, new Map<string, string[]>());

  const pagesMap = new Map<string, SitemapOption>();

  pages.forEach((page) => {
    const frontmatterOptions: SitemapFrontmatterOption =
      (page.frontmatter.sitemap as SitemapFrontmatterOption) || {};
    const metaRobots = (page.frontmatter.meta || []).find(
      (meta) => meta.name === "robots"
    );
    const excludePage = metaRobots
      ? (metaRobots.content || "")
          .split(/,/u)
          .map((content) => content.trim())
          .includes("noindex")
      : frontmatterOptions.exclude;

    if (excludePage) exclude.push(page.path);

    const lastmodifyTime = dateFormatter(page);
    const { normalizedPath } = stripLocalePrefix(page.path, localeKeys);
    const relatedLocales =
      localesByNormalizedPagePath.get(normalizedPath) || [];

    let links: SitemapLinkOption[] = [];

    if (relatedLocales.length > 1)
      links = relatedLocales.map((localePrefix) => ({
        lang: locales[localePrefix].lang || "en",
        url: `${base}${normalizedPath.replace("/", localePrefix)}`,
      }));

    pagesMap.set(page.path, {
      ...frontmatterOptions,
      changefreq: frontmatterOptions.changefreq || changefreq,
      lastmod: lastmodifyTime,
      links,
    });
  });

  return pagesMap;
};

export const genSiteMap = async (
  options: SitemapOptions,
  context: Context
): Promise<void> => {
  console.log(
    blue("Sitemap:"),
    black.bgYellow("wait"),
    "Generating sitemap..."
  );

  const siteData = context.getSiteData();

  const {
    hostname,
    urls = [],
    outFile = "sitemap.xml",
    xslUrl,
    exclude = [],
    xmlNameSpace: xmlns,
  } = options;
  const sitemap = new SitemapStream({
    hostname,
    xslUrl,
    xmlns,
  });
  const sitemapXMLPath = resolve(context.outDir, outFile);
  const writeStream = createWriteStream(sitemapXMLPath);

  sitemap.pipe(writeStream);

  const base = siteData.base.replace(/\/$/u, "");
  const pagesMap = generatePageMap(siteData, base, options);

  pagesMap.forEach((page, url) => {
    if (!exclude.includes(url))
      sitemap.write({ url: `${base}${url}`, ...page });
  });

  urls.forEach((item) => sitemap.write(item));
  sitemap.end();
  console.log(
    blue("Sitemap:"),
    black.bgGreen("Success"),
    `Sitemap generated and saved to ${cyan(
      relative(context.cwd, sitemapXMLPath)
    )}`
  );

  const robotTxtPath = resolve(context.outDir, "robots.txt");
  const robotsTxt = existsSync(robotTxtPath)
    ? await readFile(robotTxtPath, { encoding: "utf8" })
    : "";

  const newRobotsTxtContent = `${robotsTxt.replace(
    /^Sitemap: .*$/u,
    ""
  )}\nSitemap: ${options.hostname.replace(/\/$/u, "")}${
    context.base
  }${outFile}\n`;

  await writeFile(robotTxtPath, newRobotsTxtContent, { flag: "w" });

  console.log(
    blue("Sitemap:"),
    black.bgGreen("Success"),
    `Appended sitemap path to ${cyan("robots.txt")}`
  );
};
