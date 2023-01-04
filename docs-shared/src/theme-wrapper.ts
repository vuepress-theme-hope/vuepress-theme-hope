import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeFunction } from "@vuepress/core";
import type { ThemeOptions } from "vuepress-theme-hope";

const IS_GITEE = "GITEE" in process.env;
const IS_NETLIFY = "NETLIFY" in process.env;
const IS_GITHUB = !IS_GITEE && !IS_NETLIFY;

export const theme = (
  name: string,
  { plugins = {}, ...options }: ThemeOptions
): ThemeFunction => {
  const canonical = `https://${
    name === "theme"
      ? "theme-hope"
      : name === "shared"
      ? "shared"
      : `plugin-${name}`
  }.vuejs.press`;

  const hostname = IS_GITHUB
    ? "https://vuepress-theme-hope.github.io"
    : IS_GITEE
    ? "https://vuepress-theme-hope.gitee.io"
    : canonical;

  return hopeTheme({
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

      seo: hostname === canonical ? {} : { canonical },

      ...plugins,
    },

    ...options,
  });
};
