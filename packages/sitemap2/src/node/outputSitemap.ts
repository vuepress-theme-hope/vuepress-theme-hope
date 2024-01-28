import type { App } from "vuepress/core";
import { colors, fs } from "vuepress/utils";

import { getSiteMap } from "./getSitemap.js";
import { getSiteMapTemplate } from "./getSitemapTemplate.js";
import type { SitemapOptions } from "./options.js";
import { logger } from "./utils.js";

export const outputSitemap = async (
  app: App,
  options: SitemapOptions,
): Promise<void> => {
  const {
    dir,
    options: { base },
  } = app;

  const [sitemapPath, sitemapContent] = await getSiteMap(app, options);
  const [templatePath, templateContent] = getSiteMapTemplate(options);

  fs.writeFileSync(app.dir.dest(sitemapPath), sitemapContent);
  fs.writeFileSync(app.dir.dest(templatePath), templateContent);

  logger.succeed(`Generating sitemap to ${colors.cyan(`/${sitemapPath}`)}`);

  const robotTxtPath = dir.dest("robots.txt");

  if (fs.existsSync(robotTxtPath)) {
    logger.load(`Appended sitemap path to ${colors.cyan("robots.txt")}`);

    const robotsTxt = await fs.readFile(robotTxtPath, "utf-8");

    const newRobotsTxtContent = `${robotsTxt.replace(
      /^Sitemap: .*$/u,
      "",
    )}\nSitemap: ${options.hostname}${base}${sitemapPath}\n`;

    await fs.writeFile(robotTxtPath, newRobotsTxtContent, {
      encoding: "utf-8",
      flag: "w",
    });

    logger.succeed();
  }
};
