import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeFunction } from "@vuepress/core";
import type { HopeThemeOptions } from "vuepress-theme-hope";

const hostname =
  process.env["HOSTNAME"] || "https://vuepress-theme-hope-v2.netlify.app";

export const theme = (
  name: string,
  { plugins = {}, ...options }: HopeThemeOptions
): ThemeFunction =>
  hopeTheme({
    hostname,

    author: {
      name: "Mr.Hope",
      url: "https://mrhope.site",
    },

    iconAssets: "iconfont",

    repo: `vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/${name}/`,
    docsRepo: "vuepress-theme-hope/vuepress-theme-hope",
    docsDir: `docs/${name}/src`,

    logo: "/logo.svg",

    footer: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    copyright: false,
    displayFooter: true,

    pageInfo: ["Category", "Tag", "ReadingTime"],

    plugins: {
      comment: {
        provider: "Giscus",
        repo: "vuepress-theme-hope/giscus-discussions",
        repoId: "R_kgDOG_Pt2A",
        category: "Announcements",
        categoryId: "DIC_kwDOG_Pt2M4COD69",
      },

      seo:
        hostname === "https://vuepress-theme-hope.github.io"
          ? {}
          : {
              canonical: `https://vuepress-theme-hope.github.io/v2/${
                name.endsWith("2") ? name.substring(0, name.length - 1) : name
              }/`,
            },

      ...plugins,
    },

    ...options,
  });
