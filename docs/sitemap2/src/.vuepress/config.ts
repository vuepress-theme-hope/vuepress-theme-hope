import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "sitemap2" },
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
  },
);
