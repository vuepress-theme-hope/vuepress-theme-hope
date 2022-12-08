import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "@vuepress/shared";
import { colors, fs } from "@vuepress/utils";
import { SitemapStream } from "sitemap";
import { logger } from "./utils.js";

import type { App, Page } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import type { ModifyTimeGetter, SitemapOptions } from "./options.js";
import type {
  SitemapFrontmatterOption,
  SitemapImageOption,
  SitemapLinkOption,
  SitemapNewsOption,
  SitemapVideoOption,
} from "./typings/index.js";

interface SitemapPageInfo {
  lastmod?: string;
  changefreq?: string;
  priority?: number;
  img?: SitemapImageOption[];
  video?: SitemapVideoOption[];
  links?: SitemapLinkOption[];
  news?: SitemapNewsOption[];
}

const reportedLocales: string[] = [];

const stripLocalePrefix = (
  page: Page
): {
  // path of root locale
  defaultPath: string;
  // Locale path prefix of the page
  pathLocale: string;
} => ({
  defaultPath: page.path.replace(page.pathLocale, "/"),
  pathLocale: page.pathLocale,
});

const generatePageMap = (
  app: App,
  options: SitemapOptions
): Map<string, SitemapPageInfo> => {
  const {
    changefreq,
    excludeUrls = ["/404.html"],
    modifyTimeGetter = <ModifyTimeGetter>(
      ((page: Page<{ git: GitData }>): string =>
        page.data.git?.updatedTime
          ? new Date(page.data.git.updatedTime).toISOString()
          : "")
    ),
  } = options;

  const {
    pages,
    options: { base, locales },
  } = app;

  const pageLocalesMap = pages.reduce(
    (map, page) => {
      const { defaultPath, pathLocale } = stripLocalePrefix(page);
      const pathLocales = map.get(defaultPath) || [];

      pathLocales.push(pathLocale);

      return map.set(defaultPath, pathLocales);
    },
    // a map with keys of defaultPath and string[] value with pathLocales
    new Map<string, string[]>()
  );

  const pagesMap = new Map<string, SitemapPageInfo>();

  pages.forEach((page) => {
    const frontmatterOptions: SitemapFrontmatterOption =
      <SitemapFrontmatterOption>page.frontmatter["sitemap"] || {};

    const metaRobotTags = (page.frontmatter.head || []).find(
      (head) => head[1]["name"] === "robots"
    );

    const excludePage = metaRobotTags
      ? (<string>metaRobotTags[1]["content"] || "")
          .split(/,/u)
          .map((content) => content.trim())
          .includes("noindex")
      : frontmatterOptions.exclude;

    if (excludePage || excludeUrls.includes(page.path)) return;

    const lastModifyTime = modifyTimeGetter(page);
    const { defaultPath } = stripLocalePrefix(page);
    const relatedLocales = pageLocalesMap.get(defaultPath) || [];

    let links: SitemapLinkOption[] = [];

    if (relatedLocales.length > 1) {
      // warnings for missing `locale[path].lang` in debug mode
      if (app.env.isDebug)
        relatedLocales.forEach((localePrefix) => {
          if (
            !locales[localePrefix].lang &&
            !reportedLocales.includes(localePrefix)
          ) {
            logger.warn(`'lang' option for ${localePrefix} is missing`);
            reportedLocales.push(localePrefix);
          }
        });

      links = relatedLocales.map((localePrefix) => ({
        lang: locales[localePrefix]?.lang || "en",
        url: `${base}${removeLeadingSlash(
          defaultPath.replace(/^\//u, localePrefix)
        )}`,
      }));
    }

    const sitemapInfo: SitemapPageInfo = {
      ...(changefreq ? { changefreq } : {}),
      links,
      ...(lastModifyTime ? { lastmod: lastModifyTime } : {}),
      ...frontmatterOptions,
    };

    // log sitemap info in debug mode
    if (app.env.isDebug) {
      logger.info(
        `sitemap option for ${page.path}: ${JSON.stringify(
          sitemapInfo,
          null,
          2
        )}`
      );
    }

    pagesMap.set(page.path, sitemapInfo);
  });

  return pagesMap;
};

export const generateSiteMap = async (
  app: App,
  options: SitemapOptions
): Promise<void> => {
  const { extraUrls = [], xmlNameSpace: xmlns } = options;
  const hostname = isLinkHttp(options.hostname)
    ? removeEndingSlash(options.hostname)
    : `https://${removeEndingSlash(options.hostname)}`;
  const sitemapFilename = options.sitemapFilename
    ? removeLeadingSlash(options.sitemapFilename)
    : "sitemap.xml";
  const {
    dir,
    options: { base },
  } = app;

  logger.load(`Generating sitemap to ${colors.cyan(`/${sitemapFilename}`)}`);

  await new Promise<void>((resolve) => {
    const sitemap = new SitemapStream({
      hostname,
      ...(xmlns ? { xmlns } : {}),
    });
    const pagesMap = generatePageMap(app, options);
    const sitemapXMLPath = dir.dest(sitemapFilename);
    const writeStream = fs.createWriteStream(sitemapXMLPath);

    sitemap.pipe(writeStream);

    pagesMap.forEach((page, path) =>
      sitemap.write({
        url: `${base}${removeLeadingSlash(path)}`,
        ...page,
      })
    );

    extraUrls.forEach((item) =>
      sitemap.write({ url: `${base}${removeLeadingSlash(item)}` })
    );
    sitemap.end(() => {
      resolve();
    });
  });

  logger.succeed();

  const robotTxtPath = dir.dest("robots.txt");

  if (fs.existsSync(robotTxtPath)) {
    logger.load(`Appended sitemap path to ${colors.cyan("robots.txt")}`);

    const robotsTxt = await fs.readFile(robotTxtPath, { encoding: "utf8" });

    const newRobotsTxtContent = `${robotsTxt.replace(
      /^Sitemap: .*$/u,
      ""
    )}\nSitemap: ${hostname}${base}${sitemapFilename}\n`;

    await fs.writeFile(robotTxtPath, newRobotsTxtContent, { flag: "w" });

    logger.succeed();
  }
};
