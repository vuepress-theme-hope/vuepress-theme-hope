import {
  Context,
  PageComputed,
  PluginOptionAPI,
  SiteData,
} from "@mr-hope/vuepress-types";
import {
  SitemapFrontmatterOption,
  SitemapLinkOption,
  SitemapImageOption,
  SitemapVideoOption,
  SitemapOptions,
} from "../types";
import { SitemapStream } from "sitemap";
import chalk from "chalk";
import { createWriteStream } from "fs";
import { resolve } from "path";

const log = (
  msg: string,
  color: "cyan" | "red" = "cyan",
  label = "Sitemap"
): void => console.log(`\n${chalk[color](`${label}: `)}${msg}`);

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

interface SitemapOption {
  lastmod: string;
  changefreq?: string;
  priority?: number;
  img?: SitemapImageOption[];
  video?: SitemapVideoOption[];
  links?: SitemapLinkOption[];
}

const generatePageMap = (
  siteData: SiteData,
  base: string,
  options: SitemapOptions
): Map<string, SitemapOption> => {
  const {
    changefreq = "daily",
    exclude = [],
    dateFormatter = (page: PageComputed): string =>
      page.lastUpdatedTime ? new Date(page.lastUpdatedTime).toISOString() : "",
  } = options;

  const { pages, locales = {} } = siteData;

  // Sort the locale keys in reverse order so that longer locales, such as '/en/', match before the default '/'
  const localeKeys = Object.keys(locales).sort().reverse() || [];
  const localesByNormalizedPagePath = pages.reduce(
    (map: Map<string, string[]>, page) => {
      const { normalizedPath, localePrefix } = stripLocalePrefix(
        page.path,
        localeKeys
      );
      const prefixesByPath = map.get(normalizedPath) || [];
      prefixesByPath.push(localePrefix);

      return map.set(normalizedPath, prefixesByPath);
    },
    new Map()
  );

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

const generateSiteMap = (
  siteData: SiteData,
  { outDir, themeConfig }: Context,
  options: SitemapOptions
): void => {
  log("Generating sitemap...");

  const {
    urls = [],
    hostname,
    outFile = "sitemap.xml",
    xslUrl,
    exclude = [],
    xmlNameSpace: xmlns,
  } = options;
  const sitemap = new SitemapStream({
    hostname: hostname || themeConfig.hostname,
    xslUrl,
    xmlns,
  });
  const sitemapXML = resolve(outDir, outFile);
  const writeStream = createWriteStream(sitemapXML);

  sitemap.pipe(writeStream);

  const base = siteData.base.replace(/\/$/u, "");
  const pagesMap = generatePageMap(siteData, base, options);

  pagesMap.forEach((page, url) => {
    if (!exclude.includes(url))
      sitemap.write({ url: `${base}${url}`, ...page });
  });

  urls.forEach((item) => sitemap.write(item));
  sitemap.end();
  log("Sitemap generated.");
};

export = (options: SitemapOptions, context: Context): PluginOptionAPI => ({
  name: "sitemap",

  generated(): void {
    const hostname = options.hostname || context.themeConfig.hostname;

    if (hostname) generateSiteMap(context.getSiteData(), context, options);
    else
      log(
        'Not generating sitemap because required "hostname" option doesn\'t exist',
        "red"
      );
  },

  plugins: ["@mr-hope/last-update", ["@vuepress/last-updated", false]],
});
