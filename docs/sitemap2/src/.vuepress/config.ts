import { config } from "docs-shared";
import theme from "./theme.js";

export default config(
  {
    base: "sitemap",
    indexName: "vuepress-theme-hope-sitemap2",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Sitemap Generator",
        description: "Generate Sitemap for your site",
      },
      "/zh/": {
        lang: "zh-CN",
        title: "Sitemap 生成器",
        description: "为你的站点生成 Sitemap",
      },
    },

    theme,
  }
);
