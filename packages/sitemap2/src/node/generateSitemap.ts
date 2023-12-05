import type { App, Page } from "@vuepress/core";
import type { GitData } from "@vuepress/plugin-git";
import { colors, fs } from "@vuepress/utils";
import { SitemapStream } from "sitemap";
import {
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from "vuepress-shared/node";

import type { ModifyTimeGetter, SitemapOptions } from "./options.js";
import type {
  SitemapImageOption,
  SitemapLinkOption,
  SitemapNewsOption,
  SitemapPluginFrontmatter,
  SitemapVideoOption,
} from "./typings/index.js";
import { TEMPLATE_FOLDER, logger } from "./utils.js";

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

const stripLocalePrefix = ({
  path,
  pathLocale,
}: Page): {
  /** path of root locale */
  defaultPath: string;
  /** Locale path prefix of the page */
  pathLocale: string;
} => ({
  defaultPath: path.replace(pathLocale, "/"),
  pathLocale: pathLocale,
});

const generatePageMap = (
  app: App,
  options: SitemapOptions,
): Map<string, SitemapPageInfo> => {
  const {
    changefreq = "daily",
    excludeUrls = ["/404.html"],
    modifyTimeGetter = <ModifyTimeGetter>(
      ((page: Page<{ git: GitData }>): string =>
        page.data.git?.updatedTime
          ? new Date(page.data.git.updatedTime).toISOString()
          : "")
    ),
  } = options;

  const {
    options: { base, locales },
    pages,
  } = app;

  const pageLocalesMap = pages.reduce(
    (map, page) => {
      const { defaultPath, pathLocale } = stripLocalePrefix(page);
      const pathLocales = map.get(defaultPath) || [];

      pathLocales.push(pathLocale);

      return map.set(defaultPath, pathLocales);
    },
    // a map with keys of defaultPath and string[] value with pathLocales
    new Map<string, string[]>(),
  );

  const pagesMap = new Map<string, SitemapPageInfo>();

  pages.forEach(
    (page: Page<Record<never, never>, SitemapPluginFrontmatter>) => {
      const frontmatterOptions = page.frontmatter.sitemap;

      if (frontmatterOptions === false) return;

      const metaRobotTags = (page.frontmatter.head || []).find(
        (head) => head[1]["name"] === "robots",
      );

      if (
        // meta tags do not allow index
        (<string>metaRobotTags?.[1]["content"] || "")
          .split(/,/u)
          .map((content) => content.trim())
          .includes("noindex") ||
        // exclude in plugin options
        excludeUrls.includes(page.path)
      )
        return;

      const lastModifyTime = modifyTimeGetter(page, app);
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
              logger.warn(`"lang" option for ${localePrefix} is missing`);
              reportedLocales.push(localePrefix);
            }
          });

        links = relatedLocales.map((localePrefix) => ({
          lang: locales[localePrefix]?.lang || "en",
          url: `${base}${removeLeadingSlash(
            defaultPath.replace(/^\//u, localePrefix),
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
      if (app.env.isDebug)
        logger.info(
          `sitemap option for ${page.path}: ${JSON.stringify(
            sitemapInfo,
            null,
            2,
          )}`,
        );

      pagesMap.set(page.path, sitemapInfo);
    },
  );

  return pagesMap;
};

export const generateSiteMap = async (
  app: App,
  options: SitemapOptions,
): Promise<void> => {
  const { extraUrls = [], xmlNameSpace: xmlns } = options;
  const hostname = isLinkHttp(options.hostname)
    ? removeEndingSlash(options.hostname)
    : `https://${removeEndingSlash(options.hostname)}`;
  const sitemapFilename = options.sitemapFilename
    ? removeLeadingSlash(options.sitemapFilename)
    : "sitemap.xml";
  const sitemapXSLFilename = options.sitemapXSLFilename
    ? removeLeadingSlash(options.sitemapXSLFilename)
    : "sitemap.xsl";
  const sitemapXSLTemplate =
    options.sitemapXSLTemplate ?? `${TEMPLATE_FOLDER}sitemap.xsl`;

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
    const sitemapXSLPath = dir.dest(sitemapXSLFilename);
    const writeStream = fs.createWriteStream(sitemapXMLPath);

    sitemap.pipe(writeStream);

    pagesMap.forEach((page, path) =>
      sitemap.write({
        url: `${base}${removeLeadingSlash(path)}`,
        ...page,
      }),
    );

    writeStream.on("finish", () => {
      const content = fs.readFileSync(sitemapXMLPath, {
        encoding: "utf-8",
      });

      fs.writeFileSync(
        sitemapXMLPath,
        content.replace(
          '<?xml version="1.0" encoding="UTF-8"?>',
          `\
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="${base}${sitemapXSLFilename}"?>
`,
        ),
      );

      fs.copySync(sitemapXSLTemplate, sitemapXSLPath);

      resolve();
    });

    extraUrls.forEach((item) =>
      sitemap.write({ url: `${base}${removeLeadingSlash(item)}` }),
    );
    sitemap.end();
  });

  logger.succeed();

  const robotTxtPath = dir.dest("robots.txt");

  if (fs.existsSync(robotTxtPath)) {
    logger.load(`Appended sitemap path to ${colors.cyan("robots.txt")}`);

    const robotsTxt = await fs.readFile(robotTxtPath, { encoding: "utf8" });

    const newRobotsTxtContent = `${robotsTxt.replace(
      /^Sitemap: .*$/u,
      "",
    )}\nSitemap: ${hostname}${base}${sitemapFilename}\n`;

    await fs.writeFile(robotTxtPath, newRobotsTxtContent, { flag: "w" });

    logger.succeed();
  }
};
