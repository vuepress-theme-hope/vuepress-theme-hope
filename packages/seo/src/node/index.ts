import { black, blue, cyan } from "chalk";
import { readFile, existsSync, writeFile } from "fs-extra";
import { relative, resolve } from "path";
import { generateSeo } from "./seo";
import { appendMeta } from "./meta";
import { striptags } from "./stripTags";
import { md2text } from "./utils";

import type { Page, Plugin, ThemeConfig } from "@mr-hope/vuepress-types";
import type { PageSeoInfo, SeoOptions } from "../types";
import type { SeoContent } from "../types/seo";

const getLocales = ({ locales = {} }: ThemeConfig): string[] => {
  const langs: string[] = [];
  for (const path in locales)
    if (locales[path].lang) langs.push(locales[path].lang as string);

  return langs;
};

const seoPlugin: Plugin<SeoOptions> = (options, context) => {
  const { themeConfig } = context;
  const seoOption =
    Object.keys(options).length > 0 ? options : themeConfig.seo || {};

  return {
    name: "seo",

    extendPageData(page): void {
      const site = context.getSiteData();
      const meta = page.frontmatter.meta || [];

      // generate summary
      if (!page.frontmatter.description)
        page.frontmatter.summary =
          striptags(page.excerpt) ||
          md2text(page._strippedContent).slice(0, 180) ||
          "";

      // In VuePress core, permalinks are built after enhancers.
      const pageClone = Object.assign(
        Object.create(Object.getPrototypeOf(page) as object) as Page,
        page
      );
      pageClone.buildPermalink();

      const pageSeoInfo: PageSeoInfo = {
        page,
        site,
        themeConfig,
        locale: getLocales(themeConfig),
        path: pageClone.path,
      };
      const metaContext: SeoContent = {
        ...generateSeo(seoOption, context.base, pageSeoInfo),
        ...(seoOption.seo ? seoOption.seo(pageSeoInfo) : {}),
      };

      appendMeta(meta, metaContext, seoOption);
      if (seoOption.customMeta) seoOption.customMeta(meta, pageSeoInfo);

      page.frontmatter.meta = meta;
    },

    async generated(): Promise<void> {
      console.log(
        blue("SEO:"),
        black.bgYellow("wait"),
        "Generating robots.txt..."
      );
      const useRobotsTxtPath = resolve(
        context.sourceDir,
        "./.vuepress/public/robots.txt"
      );

      let userRobotsTxt = existsSync(useRobotsTxtPath)
        ? await readFile(useRobotsTxtPath, { encoding: "utf8" })
        : "";

      if (userRobotsTxt && !userRobotsTxt.includes("User-agent"))
        console.log(
          blue("SEO:"),
          black.bgRed("error"),
          "robots.txt seems invalid!"
        );
      else userRobotsTxt += "\nUser-agent:*\nDisallow:\n";

      const outputRobotsTxtPath = resolve(context.outDir, "./robots.txt");

      await writeFile(outputRobotsTxtPath, userRobotsTxt, {
        flag: "w",
      });

      console.log(
        blue("SEO:"),
        black.bgGreen("Success"),
        `${cyan("robots.txt")} generated and saved to ${cyan(
          relative(context.cwd, context.outDir)
        )}`
      );
    },

    plugins: [["@mr-hope/git", themeConfig.git || true]],
  };
};

export = seoPlugin;
