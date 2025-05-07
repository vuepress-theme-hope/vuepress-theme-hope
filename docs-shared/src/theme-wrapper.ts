import type { ThemeFunction } from "vuepress/core";
import type { ThemeOptions } from "vuepress-theme-hope";
import { hopeTheme } from "vuepress-theme-hope";

// const IS_PROD = process.env.NODE_ENV === "production";
const IS_GITEE = "GITEE" in process.env;
const IS_NETLIFY = "NETLIFY" in process.env;
const IS_GITHUB = !IS_GITEE && !IS_NETLIFY;

export const theme = (
  name: string,
  { markdown = {}, plugins = {}, ...options }: ThemeOptions,
  base = name.replace(/\d+$/, ""),
  indexName?: string,
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

  const themeOptions: ThemeOptions = {
    hostname,

    author: {
      name: "Mr.Hope",
      url: "https://mister-hope.com",
    },

    favicon: "/favicon.ico",

    repo: `vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/${name}/`,
    docsRepo: "vuepress-theme-hope/vuepress-theme-hope",
    docsDir: `docs/${name}/src`,

    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    navbarLayout: {
      start: ["Brand"],
      center: ["Links"],
      end: ["Language", "SocialLink", "Repo", "Outlook", "Search"],
    },

    copyright: "MIT Licensed | Copyright © 2019-present Mr.Hope",
    displayFooter: true,

    pageInfo: ["ReadingTime", "Category", "Tag"],
    changelog: true,
    contributors: "content",

    markdown: {
      highlighter: {
        type: "shiki",
        lineNumbers: 15,
        themes: {
          light: "one-light",
          dark: "one-dark-pro",
        },
      },
      ...markdown,
    },

    plugins: {
      comment: {
        provider: "Giscus",
        repo: "vuepress-theme-hope/giscus-discussions",
        repoId: "R_kgDOG_Pt2A",
        category: "Announcements",
        categoryId: "DIC_kwDOG_Pt2M4COD69",
        mapping: "url",
      },

      docsearch: {
        appId: "VXIEHELDL1",
        apiKey: "595796f71b6ba14326719682c3738c0c",
        indexName: `vuepress-theme-hope-${indexName ?? name}`,
        indexBase: base ? `/v2/${base}/` : "/v2/",
      },

      git: {
        contributors: {
          avatar: true,
          info: [
            {
              username: "Mister-Hope",
              name: "Mr.Hope",
              alias: "Mr.Hope",
            },
          ],
        },
      },

      ...(IS_NETLIFY
        ? {}
        : {
            notice: [
              {
                path: "/",
                title: "New docs location",
                content:
                  "Our docs has moved to a new domain vuejs.press<br>Current docs is built from the latest commit on the main branch, and may contain <strong>unreleased changes</strong>!",
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
                content:
                  "我们的文档已经迁移至新域名 vuejs.press 下。<br>当前文档是基于主分支最新提交构建的，可能包含<strong>未发布的更改</strong>。",
                actions: [
                  {
                    text: "立即访问",
                    link: `${canonical}/zh/`,
                  },
                ],
              },
            ],
          }),

      icon: {
        assets: [
          "https://theme-hope-assets.vuejs.press/fontawesome/js/fontawesome.min.js",
          "https://theme-hope-assets.vuejs.press/fontawesome/js/solid.min.js",
          "https://theme-hope-assets.vuejs.press/fontawesome/js/brands.min.js",
        ],
      },

      redirect: { switchLocale: "modal" },

      seo: hostname === canonical ? {} : { canonical },

      ...plugins,
    },

    ...options,
  };

  return hopeTheme(themeOptions);
};
