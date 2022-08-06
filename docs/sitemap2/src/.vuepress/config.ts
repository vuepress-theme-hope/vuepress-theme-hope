import { config } from "docs-shared";
import theme from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default config({
  base: `${base}sitemap/`,

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
});
