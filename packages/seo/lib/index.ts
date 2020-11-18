import { black, blue } from "chalk";
import { readFile, existsSync, writeFile } from "fs-extra";
import { resolve } from "path";
import { generateSeo } from "./genSeo";
import { appendMeta } from "./meta";

import {
  Context,
  PluginOptionAPI,
  ThemeConfig,
  Page,
} from "@mr-hope/vuepress-types";
import { PageSeoInfo, SeoOptions } from "../types";
import { SeoContent } from "../types/seo";

const getLocales = ({ locales = {} }: ThemeConfig): string[] => {
  const langs: string[] = [];
  for (const path in locales)
    if (locales[path].lang) langs.push(locales[path].lang as string);

  return langs;
};

export = (options: SeoOptions, context: Context): PluginOptionAPI => {
  const { themeConfig } = context;
  const option =
    Object.keys(options).length > 0 ? options : themeConfig.seo || {};

  return {
    name: "seo",

    extendPageData($page): void {
      const $site = context.getSiteData();
      const meta = $page.frontmatter.meta || [];

      // In VuePress core, permalinks are built after enhancers.
      const pageClone = Object.assign(
        Object.create(Object.getPrototypeOf($page)) as Page,
        $page
      );
      pageClone.buildPermalink();

      const pageSeoInfo: PageSeoInfo = {
        $page,
        $site,
        themeConfig,
        locale: getLocales(themeConfig),
        path: pageClone.path,
      };
      const metaContext: SeoContent = {
        ...generateSeo(option, pageSeoInfo),
        ...(option.seo ? option.seo(pageSeoInfo) : {}),
      };

      appendMeta(meta, metaContext, option);
      if (option.customMeta) option.customMeta(meta, pageSeoInfo);

      $page.frontmatter.meta = meta;
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

      let userRobotsTxT = existsSync(useRobotsTxtPath)
        ? await readFile(useRobotsTxtPath, { encoding: "utf8" })
        : "";

      if (userRobotsTxT && !userRobotsTxT.includes("User-agent"))
        console.log(
          blue("SEO:"),
          black.bgRed("error"),
          "robots.txt seems invalid!"
        );
      else userRobotsTxT += "\nUser-agent:*\nDisallow:\n";

      await writeFile(resolve(context.outDir, "./robots.txt"), userRobotsTxT, {
        flag: "w",
      });

      console.log(
        blue("SEO:"),
        black.bgGreen("Success"),
        "Generated robots.txt"
      );
    },

    plugins: [
      ["@mr-hope/last-update", themeConfig.lastUpdate || true],

      ["@vuepress/last-updated", false],
    ],
  };
};
