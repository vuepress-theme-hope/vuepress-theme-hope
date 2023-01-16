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
  const subdomain =
    name === "theme"
      ? "theme-hope"
      : name === "shared"
      ? "shared"
      : `plugin-${name}`;
  const canonical = `https://${subdomain}.vuejs.press`;

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

    favicon: "/favicon.ico",

    iconAssets: "iconfont",

    repo: `vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/${name}/`,
    docsRepo: "vuepress-theme-hope/vuepress-theme-hope",
    docsDir: `docs/${name}/src`,

    logo: "/logo.svg",

    copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    pageInfo: ["ReadingTime", "Category", "Tag"],

    plugins: {
      comment: {
        provider: "Giscus",
        repo: "vuepress-theme-hope/giscus-discussions",
        repoId: "R_kgDOG_Pt2A",
        category: "Announcements",
        categoryId: "DIC_kwDOG_Pt2M4COD69",
      },

      components: IS_NETLIFY
        ? {}
        : {
            rootComponents: {
              notice: [
                {
                  path: "/",
                  title: "New docs location",
                  content: "Our docs has moved to a new domain vuejs.press",
                  actions: [
                    {
                      text: "Visit Now",
                      link: canonical,
                    },
                  ],
                },
                {
                  path: "/zh/",
                  title: "新的文档地址",
                  content: "我们的文档已经迁移至新域名 vuejs.press 下。",
                  actions: [
                    {
                      text: "立即访问",
                      link: `${canonical}/zh/`,
                    },
                  ],
                },
              ],
            },
          },

      seo: hostname === canonical ? {} : { canonical },

      ...plugins,
    },

    ...options,
  });
};
