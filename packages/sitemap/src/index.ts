import {
  Context,
  PageComputed,
  PluginOptionAPI,
  SiteData,
} from "vuepress-types";
import { SitemapOptions } from "../types";
import { SitemapStream } from "sitemap";
import chalk from "chalk";
import { createWriteStream } from "fs";
import { resolve } from "path";

/** 输出日志 */
const log = (
  msg: string,
  color: "cyan" | "red" = "cyan",
  label = "SITEMAP"
): void => console.log(`\n${chalk[color](` ${label} `)} ${msg}`);

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

// eslint-disable-next-line max-lines-per-function
const generatePageMap = (
  siteData: SiteData,
  base: string,
  options: SitemapOptions
): Map<string, string[]> => {
  const {
    changefreq = "daily",
    exclude = [],
    dateFormatter = (page: PageComputed): string =>
      page.lastUpdatedTime ? new Date(page.lastUpdatedTime).toISOString() : "",
    ...others
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

  const pagesMap = new Map();

  pages.forEach((page) => {
    const frontmatterOptions = page.frontmatter.sitemap || {};
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

    // 生成上次的更新时间
    const lastmodifyTime = dateFormatter(page);

    const { normalizedPath } = stripLocalePrefix(page.path, localeKeys);
    const relatedLocales =
      localesByNormalizedPagePath.get(normalizedPath) || [];

    let links: { lang: string; url: string }[] = [];

    if (relatedLocales.length > 1)
      links = relatedLocales.map((localePrefix) => ({
        lang: locales[localePrefix].lang,
        url: `${base}${normalizedPath.replace("/", localePrefix)}`,
      }));

    pagesMap.set(page.path, {
      changefreq: frontmatterOptions.changefreq || changefreq,
      lastmodISO: lastmodifyTime,
      links,
      ...others,
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

  const { urls = [], hostname, xslUrl, exclude = [] } = options;
  const sitemap = new SitemapStream({
    hostname: hostname || themeConfig.hostname,
    xslUrl,
  });
  const sitemapXML = resolve(outDir, options.outFile || "sitemap.xml");
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

  plugins: ["@mr-hope/last-update"],
});
